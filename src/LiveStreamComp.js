import React from 'react';
import { Alert, Switch, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { View, StatusBar, BackHandler, Pressable, TextInput, Image, Text } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import MaskedElement from './components/MaskedElement';
import MaskedView from './components/MaskedView';
import MessageComp from "./components/MessageComp";
import LiveCounterComp from './components/LiveCounterComp';
import Colors from './utils/Colors'
import Dimens from './utils/Dimens'
import Strings from './utils/Strings'
import { ATTENDEE, HOST, BASE_URL, CO_HOST, INITIAL_REACTIONS } from './utils/Constants';
import { ITEM_SEPERATOR, CHATS, TOTAL_AUDIENCE, CHAT_VISIBILITY, CALL_STATUS, SET_CALL_STATUS, REACTIONS_ROOT, ACTIVITY_MAP } from './utils/Constants';
import database from '@react-native-firebase/database';
import { onClearData, onUpdateCount, onUpdateReactionMapper, setReactionMap } from './redux/action'
import { connect } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LiveStreamComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            callJoined: false,
            channelId: "",
            chatlist: [],
            isChatToggleEnabled: true,
            isChatEnable: true
        }
        this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
        this.onConferenceJoined = this.onConferenceJoined.bind(this);
        this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
    }

    /**
     * Adding firebase listener's for chat and viewer's count
     * 
     */
    addFirebaseListeners(channelId) {
        // Putting a listener for reading chatlist
        this.dbReference = database().ref(ITEM_SEPERATOR + channelId + CHATS)
            .on('child_added', snapshot => {
                let chatlist = this.state.chatlist;
                let data = snapshot.val();
                data.key = snapshot.key;
                chatlist.push(data);
                this.setState({
                    chatlist
                })
            })

        // Putting a listener for reading live viewer's count
        this.countReference = database().ref(ITEM_SEPERATOR + channelId + TOTAL_AUDIENCE)
            .on('value', snapshot => {
                this.props.onUpdateCount(snapshot.val())
            })

        // Listening to chat visiblity for Co-Host
        if (this.props.user == CO_HOST) {
            // Putting a listener for listening to co-host chat visibility Todo
            this.chatReference = database().ref(ITEM_SEPERATOR + channelId + CHAT_VISIBILITY)
                .on('value', snapshot => {
                    this.setState({
                        isChatEnable: snapshot.val()
                    })
                })
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.endCall);
        const url = this.props.callUrl  // can also be only room name and will connect to jitsi meet servers
        const userInfo = {
            displayName: this.props.userName,
            email: this.props.email,
            avatar: this.props.userImageUrl
        };

        this.joinStreaming(url, userInfo);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.endCall);
        clearTimeout(this.starListener);
        this.starListener = null;
        this.removeFirebaseListeners();
        this.updateFirebase();
        this.jitsiErrorFixReverse();
    }

    /**
     * Method to end/leave the stream and send the callback to the parent 
     * component
     * 
     */
    endCall = () => {
        if (this.props.user == HOST) {
            this.showAlert(Strings.ALERT, Strings.END_LIVE_STREAM);
        } else if (this.props.user == ATTENDEE) {
            this.showAlert(Strings.ALERT, Strings.ARE_YOU_SURE_YOU_WANT_TO_LEAVE);
        }
        return true
    };

    /**
     * Shows an alert dialog with proper messages for {@link HOST} as well as
     * {@link ATTENDEE}
     * 
     * @param {*} title 
     * @param {*} msg 
     */
    showAlert(title, msg) {
        Alert.alert(
            title,
            msg,
            [
                {
                    text: Strings.OK,
                    onPress: () => {
                        this.props.onCallEnded();
                    }
                },
                {
                    text: Strings.CANCEL,
                    onPress: () => { }
                }
            ],
            { cancelable: false }
        );
    }

    /**
     * Gets the value of the reaction from Redux, used to calculate the delta 
     * and update the current value in Redux to calculate the delta for next
     * round.
     * 
     * @param {*} key     Key for the reaction 
     * @param {*} value   Reaction count
     */
    getValue(key, value) {
        currentValue = this.props.chats.totalReactions[key]
        let localObj = { ...this.props.chats.totalReactions }
        localObj[key] = value
        this.props.onUpdateReactionMapper(localObj)
        return currentValue
    }

    /**
     * Method that displays alert when a user joins a stream that has ended 
     * and navigates back
     * 
     */
    goBack() {
        Alert.alert(
            Strings.ALERT,
            Strings.LIVE_STREAM_ENDED,
            [
                {
                    text: Strings.OK,
                    onPress: () => {
                        JitsiMeet.endCall();
                        this.props.onClearData();
                        this.props.onCallEnded();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    /**
     * Required for Jitsi React Native
     * 
     */
    jitsiErrorFix() {
        StatusBar.setHidden(false, 'none'); // don't remove
        StatusBar.setTranslucent(false); // don't remove
        StatusBar.setBackgroundColor('#000000'); // you can remove
        StatusBar.setBarStyle('light-content'); // you can remove
        setTimeout(() => {
            StatusBar.setHidden(false, 'none'); // this might be false if you want to show statusbar
            StatusBar.setTranslucent(true); // don't remove
            // StatusBar.setBackgroundColor('#000000'); // you can remove
            // StatusBar.setBarStyle('light-content'); // you can remove
        }, 100)
    }

    /**
     * Reversing the changes that were made to fix the errors, after
     * the jitsi call is joined.
     * 
     */
    jitsiErrorFixReverse() {
        StatusBar.setHidden(false, 'none'); // this might be false if you want to show statusbar
        StatusBar.setTranslucent(false); // don't remove
    }

    /**
     * Join/Start the live stream depending on the user type
     * {@link ATTENDEE} will join an on going live stream or show an exit dialog
     * if the stream has ended.
     * {@link HOST} will start a new live stream
     * 
     * @param {*} url        Url of the live stream
     * @param {*} userInfo   Info of the user including name, profile image url and email
     */
    joinStreaming(url, userInfo) {
        if (this.props.user == ATTENDEE) {
            var channelId = this.props.callUrl.replace(BASE_URL, "");
            database()
                .ref(ITEM_SEPERATOR + channelId + CALL_STATUS)
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        JitsiMeet.call(url + '#config.startWithVideoMuted=true&config.startVideoMuted=true&config.startWithAudioMuted=true&config.startAudioMuted=true', userInfo);              // Stream is live
                    } else {
                        this.goBack();                              // Stream has ended
                    }
                });
        } else {
            JitsiMeet.call(url, userInfo);
        }
    }

    onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
    }

    onConferenceJoined(nativeEvent) {
        // Required for jitsi error 
        this.jitsiErrorFix();
        var channelId = this.props.callUrl.replace(BASE_URL, "");
        this.setState({
            callJoined: true,
            channelId: channelId,
        })
        // Creating db and setting call status for other users to join
        if (this.props.user == HOST) {
            const newReference = database().ref(ITEM_SEPERATOR + channelId + SET_CALL_STATUS);
            newReference.set({ isActive: true })
                .then(() => {
                    this.updateChatVisibility(true);
                });
        } else if (this.props.user == ATTENDEE) {
            /** Putting a listener on call status(Used when the host ends the live stream)
             *  and navigating properly after the call has ended.
             *  
             */
            this.statusReference = database()
                .ref(ITEM_SEPERATOR + channelId + CALL_STATUS)
                .on('value', snapshot => {
                    if (!snapshot.val()) {
                        // Live Stream has ended 
                        this.goBack();
                    } else {
                        // Increment the total live audience counter
                        this.updateLiveAudienceCount(true);
                    }
                });
        }
        this.setReactionMapper();
        this.addFirebaseListeners(channelId);
    }

    onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
    }

    /**
    * Listener for text changes in msg text input
    * 
    * @param {*} value 
    */
    onMsgUpdated(value) {
        this.setState({
            msg: value
        })
    }

    /**
     * Writes the data to firebase
     * 
     */
    onReact(emoticon) {
        const newReference = database().ref(ITEM_SEPERATOR + this.state.channelId + REACTIONS_ROOT + ITEM_SEPERATOR + emoticon)
            .transaction(currentReactions => {
                if (currentReactions === null) return 1;
                return currentReactions + 1;
            })
            .then(transaction => { });
    }

    /**
     * Method to write message in firebase and clear the char input
     * 
     */
    onSendMsg() {
        if (this.state.msg.trim().length > 0) {
            const newReference = database().ref(ITEM_SEPERATOR + this.state.channelId + CHATS).push();
            newReference.set({
                msg: this.state.msg,
                profileName: this.props.userName,
                imageUrl: this.props.userImageUrl
            })
                .then(() => {
                    this.setState({
                        msg: ""
                    })
                });
        }
    }

    /**
     * Removing the listeners
     * 
     */
    removeFirebaseListeners() {
        // Removing listener for call status in case of ATTENDEE
        if (this.props.user == ATTENDEE) {
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + CALL_STATUS)
                .off('value', this.statusReference);
        }
        // Removing listener for chats
        database().ref(ITEM_SEPERATOR + this.state.channelId + CHATS)
            .off('child_added', this.dbReference);
        // Removing listener for the viewer's count
        database().ref(ITEM_SEPERATOR + this.state.channelId + TOTAL_AUDIENCE)
            .off('value', this.countReference);
        if (this.props.user == CO_HOST) {
            // Removing listener for the co-host chat visibility
            database().ref(ITEM_SEPERATOR + this.state.channelId + CHAT_VISIBILITY)
                .off('value', this.chatReference);
        }
    }

    /**
     * Method that returns the message item component for chat list
     * 
     * @param {*} param0 
     */
    _renderItemComponent = ({ item, index }) => {
        return (
            <MessageComp
                imageUrl={item.imageUrl}
                name={item.profileName}
                msg={item.msg}
            />
        )
    }

    /**
     * Method that starts a listener that fetches the reaction count every second,
     * calculates the delta and updates in the Redux.
     * 
     */
    setReactionMapper() {
        this.starListener = setTimeout(() => {
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + REACTIONS_ROOT)
                .once('value')
                .then(snapshot => {
                    let data = snapshot.val();
                    let reactionArr = [...this.props.chats.reactions]
                    if (data) {
                        let deltaReactions = Object.fromEntries(
                            // convert to array, map, and then fromEntries gives back the object
                            Object.entries(data).map(([key, value]) =>
                                [key, value - this.getValue(key, value)]
                            )
                        );
                        reactionArr.push(deltaReactions);
                    } else {
                        reactionArr.push(INITIAL_REACTIONS);
                    }
                    this.props.setReactionMap(reactionArr);
                    this.setReactionMapper();
                });
        }, 1000);
    }

    /**
     * Method that get's called when the chat visiility switch is toggled.
     * 
     */
    toggleSwitch = () => {
        this.updateChatVisibility(!this.state.isChatToggleEnabled)
        this.setState({
            isChatToggleEnabled: !this.state.isChatToggleEnabled
        })
    }

    /**
     * Updates the firebase with chat visibility
     * 
     * @param {*} value 
     */
    updateChatVisibility(value) {
        database().ref(ITEM_SEPERATOR + this.state.channelId + SET_CALL_STATUS)
            .update({
                chatVisible: value
            })
            .then(() => { });
    }

    /**
    * Updates the firebase that the {@link HOST} has ended the live stream or
    * the {@link ATTENDEE} has left the live stream
    * 
    */
    updateFirebase() {
        JitsiMeet.endCall();
        if (this.props.user == HOST) {
            const newReference = database().ref(ITEM_SEPERATOR + this.state.channelId + SET_CALL_STATUS);
            newReference.update({ isActive: false })
                .then(() => {
                    database()
                        .ref(ITEM_SEPERATOR + this.state.channelId + ACTIVITY_MAP)
                        .set({
                            reactions: this.props.chats.reactions
                        })
                        .then(() => {
                            this.props.onClearData();
                        })
                });

        } else if (this.props.user == ATTENDEE) {
            if (this.state.channelId != null && this.state.channelId.length > 0) {
                this.updateLiveAudienceCount(false);
            }
            this.props.onClearData();
        }
    }

    /**
     * Updates the total live audience count in firebase db based on
     * the boolean passes using a Firebase Transaction
     * 
     * @param {*} toIncrement wether the user has joined(True) or is leaving(False)
     */
    updateLiveAudienceCount(toIncrement) {
        const reference = database().ref(ITEM_SEPERATOR + this.state.channelId + TOTAL_AUDIENCE)
            .transaction(totalCount => {
                if (toIncrement) {
                    if (totalCount === null) return 1;
                    return totalCount + 1;
                } else {
                    if (totalCount === null) return 0;
                    return totalCount - 1;
                }
            })
            .then(transaction => { });
    }

    render() {
        const { user } = this.props;
        const { callJoined, isChatToggleEnabled, isChatEnable } = this.state;
        return (
            <View style={{ backgroundColor: 'black', flex: 1, width: '100%', height: '100%' }}>
                <JitsiMeetView
                    onConferenceTerminated={this.onConferenceTerminated}
                    onConferenceJoined={this.onConferenceJoined}
                    onConferenceWillJoin={this.onConferenceWillJoin}
                    style={{ flex: 1, height: '100%', width: '100%' }} />

                { callJoined ?
                    <View style={Styles.chatRoot}>
                        <MaskedView element={<MaskedElement />}>
                            <View style={Styles.listRoot}>
                                {user == CO_HOST && !isChatEnable ?
                                    null :
                                    <FlatList
                                        data={this.state.chatlist}
                                        extraData={this.state}
                                        renderItem={this._renderItemComponent}
                                        style={Styles.flatlistStyle}
                                        ref={ref => this.flatList = ref}
                                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                                        contentContainerStyle={Styles.listContainerStyle} />
                                }
                            </View>

                        </MaskedView>
                        {
                            user == ATTENDEE ?
                                <KeyboardAvoidingView style={Styles.bottomRoot}>
                                    <TextInput
                                        style={Styles.msgRoot}
                                        placeholder={Strings.ENTER_MESSAGE}
                                        onChangeText={this.onMsgUpdated.bind(this)}
                                        value={this.state.msg}
                                        placeholderTextColor={Colors.GREY} />

                                    <Pressable
                                        onPress={this.onSendMsg.bind(this)}
                                        style={Styles.buttonStyle}>
                                        <Image
                                            style={Styles.imageBtnStyle}
                                            source={require('./../assets/images/send.png')}
                                        />
                                    </Pressable>
                                    <Pressable
                                        onPress={this.onReact.bind(this, "Star")}
                                        style={Styles.buttonStyle}>
                                        <Image
                                            style={Styles.imageBtnStyle}
                                            source={require('./../assets/images/star.png')}
                                        />
                                    </Pressable>
                                </KeyboardAvoidingView>
                                : null
                        }
                        {
                            user == HOST ?
                                <Pressable
                                    onPress={this.endCall}
                                    style={Styles.endBtnStyle}>
                                    <Text
                                        style={Styles.endBtnTextStyle}>
                                        {Strings.END}
                                    </Text>
                                </Pressable>
                                : null
                        }
                    </View>
                    : null
                }
                {
                    user == ATTENDEE && callJoined ?
                        <Pressable
                            onPress={this.endCall}
                            style={Styles.leaveBtnStyle}>
                            <Text
                                style={Styles.endBtnTextStyle}>
                                {Strings.LEAVE}
                            </Text>
                        </Pressable>
                        : null
                }
                { callJoined ?
                    <LiveCounterComp
                        totalCount={this.props.chats.liveAudienceCount}
                        style={Styles.liveCounterStyle} />
                    : null
                }
                {user == HOST && callJoined ?
                    <Switch
                        trackColor={{ false: Colors.TOGGLE_BACKGROUND_TRACK, true: Colors.TOGGLE_BACKGROUND_TRACK }}
                        thumbColor={isChatToggleEnabled ? Colors.RED : Colors.THUMB_COLOR_DISABLED}
                        ios_backgroundColor={Colors.TOGGLE_BACKGROUND_TRACK}
                        onValueChange={this.toggleSwitch}
                        value={isChatToggleEnabled}
                        style={Styles.chatToggleStyle}
                    />
                    : null
                }
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        color: Colors.BLACK,
    },
    flatlistStyle: {
        flexGrow: 0,
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_4
    },
    chatRoot: {
        height: windowHeight * 0.6,
        width: windowWidth,
        position: 'absolute',
        left: Dimens.dimen_0,
        bottom: Dimens.dimen_0,
        justifyContent: 'flex-end',
    },
    listRoot: {
        justifyContent: 'flex-end',
        width: windowWidth,
    },
    chatStyles: {
        fontSize: Dimens.font_14,
    },
    listContainerStyle: {
        flex: 0
    },
    emoticonsRoot: {
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: Dimens.dimen_0,
        height: windowHeight * 0.6,
        width: windowWidth,
    },
    bottomRoot: {
        flexDirection: 'row',
        padding: Dimens.dimen_8
    },
    msgRoot: {
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_4,
        marginEnd: Dimens.dimen_4,
        borderRadius: Dimens.dimen_16,
        borderWidth: Dimens.dimen_2,
        flex: 1,
        borderColor: Colors.WHITE,
        color: Colors.WHITE,
    },
    buttonStyle: {
        marginHorizontal: Dimens.dimen_4
    },
    endBtnStyle: {
        backgroundColor: Colors.RED,
        borderRadius: Dimens.dimen_4,
        position: 'absolute',
        right: Dimens.dimen_0,
        bottom: Dimens.dimen_0,
        margin: Dimens.dimen_24,
        paddingHorizontal: Dimens.dimen_12,
        paddingVertical: Dimens.dimen_6,
    },
    leaveBtnStyle: {
        backgroundColor: Colors.RED,
        borderRadius: Dimens.dimen_4,
        position: 'absolute',
        right: Dimens.dimen_0,
        top: Dimens.dimen_0,
        margin: Dimens.dimen_24,
        paddingHorizontal: Dimens.dimen_12,
        paddingVertical: Dimens.dimen_6,
    },
    endBtnTextStyle: {
        color: Colors.WHITE
    },
    imageBtnStyle: {
        width: Dimens.dimen_36,
        height: Dimens.dimen_36,
        borderRadius: Dimens.dimen_18,
    },
    liveCounterStyle: {
        position: 'absolute',
        right: Dimens.dimen_0,
        left: Dimens.dimen_0,
        margin: Dimens.dimen_24,
    },
    chatToggleStyle: {
        position: 'absolute',
        right: Dimens.dimen_0,
        top: Dimens.dimen_0,
        margin: Dimens.dimen_24,
    }
})

const mapStateToProps = (state) => {
    const { chats } = state
    return { chats }
};

export default connect(mapStateToProps, { onUpdateCount, onClearData, onUpdateReactionMapper, setReactionMap })(LiveStreamComp)