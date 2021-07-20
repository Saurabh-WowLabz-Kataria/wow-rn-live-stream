import React from 'react';
import { Alert, StyleSheet, Dimensions, KeyboardAvoidingView, FlatList, Pressable } from 'react-native';
import { View, StatusBar, BackHandler, TextInput, Image, Text } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import MessageComp from "./components/MessageComp";
import LiveCounterComp from './components/LiveCounterComp';
import Colors from './utils/Colors'
import Dimens from './utils/Dimens'
import Strings from './utils/Strings'
import { ATTENDEE, HOST, BASE_URL, CO_HOST, NORMAL, PREMIUM, EMOTICONS } from './utils/Constants';
import {
    ITEM_SEPERATOR, CHATS, TOTAL_AUDIENCE, CHAT_VISIBILITY, CHATS_COUNT, ACTIVE_ROOMS_LIST, AUDIO_STATUS, VIDEO_STATUS, DEFAULT_EMOTICON_ARRAY,
    CALL_STATUS, SET_CALL_STATUS, REACTIONS_ROOT, ACTIVITY_MAP, QUESTIONS, SELECTED_EMOJI_ARRAY, HOST_UID, CO_HOST_UID, EMOTICONS_STATUS
} from './utils/Constants';
import QuizComponent from './components/QuizComponent'
import ButtonComp from './components/ButtonComp'
import database from '@react-native-firebase/database';
import { onClearData, onUpdateCount, onUpdateReactionMapper, setReactionMap } from './redux/action'
import { connect } from 'react-redux';
import ToolbarComp from './components/ToolbarComp';
import HostOptionsComp from './components/HostOptionsComp';
import UserInteractionBottomComp from './components/UserInteractionBottomComp';
import PollList from './components/PollList';
import ImageTextComp from './components/ImageTextComp';
import WinnersComp from './components/WinnersComp';
import AnimatedEmoticonsComp from './components/AnimatedEmoticonsComp';
import CallCountdownComp from './components/CallCountdownComp';
import Toast from 'react-native-simple-toast';

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
            totalComments: 0,
            isChatToggleEnabled: true,
            isReactionsEnabled: false,
            reactionsArr: [],
            isChatEnable: true,
            startTime: 0,
            ansTime: 0,
            isQuesVisible: false,
            isWinnersListVisible: false,
            currentQuestion: null,
            currentSelectedQuesValue: -1,
            questionsList: props.questionsList,
            currentRoomKey: '',
            isPoll: false,
            pollTimer: 0,

            isAudioEnabled: true,
            isVideoEnabled: true,
            coHostUid: 0,
            hostUid: 0,
            defaultReactionMaps: {},
            deltaReactions: {},
            currentTimeStamp: 0,

            timeLimit: props.initialTimeLimit * 60 * 1000,         //In millisec
            reAttempts: props.reAttempts,
            currentAttempt: 0,
            toShowTimer: false,
            winnersList: []
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

        this.commentsCountRef = database().ref(ITEM_SEPERATOR + channelId + CHATS_COUNT)
            .on('value', snapshot => {
                this.setState({
                    totalComments: snapshot.val() ? snapshot.val() : 0
                })
            })

        // Putting a listener for reading live viewer's count
        this.countReference = database().ref(ITEM_SEPERATOR + channelId + TOTAL_AUDIENCE)
            .on('value', snapshot => {
                this.props.onUpdateCount(snapshot.val())
            })

        // Listening to chat visiblity for Co-Host
        if (this.props.user == CO_HOST || this.props.user == ATTENDEE) {
            // Putting a listener for listening to co-host chat visibility Todo
            this.chatReference = database().ref(ITEM_SEPERATOR + channelId + CHAT_VISIBILITY)
                .on('value', snapshot => {
                    this.setState({
                        isChatEnable: snapshot.val()
                    })
                })
            this.listenToWinnersList(channelId);
        }
        this.listenToQuestions(channelId);

        database()
            .ref(ITEM_SEPERATOR + channelId + HOST_UID)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    this.setState({
                        hostUid: snapshot.val()
                    })
                }
            });

        database()
            .ref(ITEM_SEPERATOR + channelId + CO_HOST_UID)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    this.setState({
                        coHostUid: snapshot.val()
                    })
                }
            });
    }

    askQuestion(value) {
        if (this.state.currentSelectedQuesValue == -1 || this.state.currentSelectedQuesValue == value) {
            let aCurrentQues = this.state.questionsList[value]
            this.setState({
                currentQuestion: aCurrentQues,
                currentSelectedQuesValue: value
            })

            // Setting the current question in firebase
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS)
                .update({
                    currentQuestion: aCurrentQues
                })
        } else {
            Toast.show('Another question is active.');
        }
    }

    startPollTimer() {
        setTimeout(() => {
            if (this.state.pollTimer < 15) {
                this.setState({
                    pollTimer: this.state.pollTimer + 1
                })
                this.startPollTimer();
            } else {
                // Get Results of the current ques from the app
                console.log(" current question to get answer for ", this.state.currentQuestion)
                this.props.getResultForQues(this.state.currentQuestion)
                this.setState({
                    pollTimer: 0,
                    currentSelectedQuesValue: -1
                })
            }
        }, 1000);
    }

    startCallTimer() {
        const aTotalTime = this.state.timeLimit
        setTimeout(() => {
            this.showCallEndAlert();
            this.showCallEndCountdown();
        }, aTotalTime - 30000);
    }

    showCallEndAlert() {
        console.log("Showing alert")
        const msg = this.state.currentAttempt < this.state.reAttempts ?
            "You stream will end in 5 mins, you want to extend by 30 mins?" : "You stream will end in 5 mins"
        Alert.alert(
            "Alert!",
            msg,
            [
                {
                    text: Strings.OK,
                    onPress: () => {
                        if (this.state.currentAttempt < this.state.reAttempts) {
                            this.setState({
                                timeLimit: 10 * 1000 + 30000,
                                currentAttempt: this.state.currentAttempt + 1
                            }, () => {
                                this.startCallTimer();
                                this.hideCallEndCountdown();
                            })
                        }
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

    showCallEndCountdown() {
        this.setState({
            toShowTimer: true
        })
    }

    hideCallEndCountdown() {
        this.setState({
            toShowTimer: false
        })
    }

    listenToQuestions(channelId) {
        this.questionsRef = database()
            .ref(ITEM_SEPERATOR + channelId + QUESTIONS + '/currentQuestion')
            .on('value', snapshot => {
                if (snapshot.val()) {
                    console.log(" current question from firebase", snapshot.val())
                    this.setState({
                        currentQuestion: snapshot.val(),
                        isQuesVisible: true,
                        startTime: this.state.pollTimer > 0 ? this.state.startTime : new Date()
                    }, () => {
                        if (this.state.currentQuestion.answered || this.state.pollTimer > 0) {

                        } else {
                            this.startPollTimer();
                            this.ansTimeout = setTimeout(() => {
                                this.setState({
                                    ansTime: 0
                                }, () => {
                                    this.props.onOptionSelected(null, 0);
                                })
                            }, 15000);
                        }
                    })
                }
            });
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
        clearTimeout(this.recationListener);
        this.recationListener = null;
        this.removeFirebaseListeners();
        this.updateFirebase(this.state.currentRoomKey);
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
        } else if (this.props.user == ATTENDEE || this.props.user == CO_HOST) {
            this.showAlert(Strings.ALERT, Strings.ARE_YOU_SURE_YOU_WANT_TO_LEAVE);
        }
        return true
    };

    onSwitchCamera = () => {
        if (this.props.videoMode == PREMIUM) {
        } else {
            JitsiMeet.toggleCamera()
        }
    }

    toggleFlash = () => {

    }

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
                        if (this.props.user == HOST || this.props.user == CO_HOST) {
                            this.setState({
                                currentQuestion: null,
                                isQuesVisible: false,
                                isWinnersListVisible: false
                            })
                        } else if (this.props.user == ATTENDEE) {
                            this.setState({
                                currentQuestion: null,
                                ansTime: 0,
                                startTime: 0,
                                isQuesVisible: false,
                                isWinnersListVisible: false
                            })
                        }
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
        let currentValue = this.props.chats.totalReactions[key]
        let localObj = { ...this.props.chats.totalReactions }
        localObj[key] = value
        this.props.onUpdateReactionMapper(localObj)
        if (currentValue == NaN || currentValue == undefined) {
            currentValue = 0
        }
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
        var channelId = this.props.callUrl.replace(BASE_URL, "");
        if (this.props.user == ATTENDEE) {
            database()
                .ref(ITEM_SEPERATOR + channelId + CALL_STATUS)
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        if (this.props.videoMode == PREMIUM) {

                        } else if (this.props.videoMode == NORMAL) {
                            JitsiMeet.call(url + '#config.startWithVideoMuted=true&config.startVideoMuted=true&config.startWithAudioMuted=true&config.startAudioMuted=true', userInfo);              // Stream is live
                        }
                    } else {
                        this.goBack();                              // Stream has ended
                    }
                });

            this.audioReference = database()
                .ref(ITEM_SEPERATOR + channelId + AUDIO_STATUS)
                .on('value', snapshot => {
                    if (snapshot.val() !== null || snapshot.val() !== undefined) {
                        this.setState({
                            isAudioEnabled: snapshot.val()
                        })
                    }
                });
            this.videoReference = database()
                .ref(ITEM_SEPERATOR + channelId + VIDEO_STATUS)
                .on('value', snapshot => {
                    if (snapshot.val() !== null || snapshot.val() !== undefined) {
                        this.setState({
                            isVideoEnabled: snapshot.val()
                        }, () => {
                        })
                    }
                });
        } else {
            if (this.props.videoMode == PREMIUM) {
            } else if (this.props.videoMode == NORMAL) {
                JitsiMeet.call(url, userInfo);
            }
        }
    }

    onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
    }

    onConferenceJoined(nativeEvent) {
        // Required for jitsi error 
        if (this.props.videoMode == NORMAL) {
            this.jitsiErrorFix();
        }
        var channelId = this.props.callUrl.replace(BASE_URL, "");
        this.setState({
            callJoined: true,
            channelId: channelId,
            isPoll: this.props.isPoll
        })
        // Creating db and setting call status for other users to join
        if (this.props.user == HOST) {
            setTimeout(() => {
                JitsiMeet.toggleVideo(false)
            }, 350);

            this.startCallTimer();

            const newReference = database().ref(ITEM_SEPERATOR + channelId + SET_CALL_STATUS);
            newReference.update({
                isActive: true,
                isVideoOn: this.state.isVideoEnabled,
                isAudioOn: this.state.isAudioEnabled
            })
                .then(() => {
                    // this.updateChatVisibility(true);
                });

            const callStatusReference = database().ref(ITEM_SEPERATOR + ACTIVE_ROOMS_LIST).push();
            this.setState({
                currentRoomKey: callStatusReference.key
            })
            callStatusReference.set({
                roomName: channelId
            })

            database()
                .ref(ITEM_SEPERATOR + channelId + QUESTIONS)
                .set({
                    questions: this.props.questionsList
                })

            this.updateChatVisibility(this.props.chatEnable, channelId)
            this.updateReactionsVisibility(this.props.reactionsArr && this.props.reactionsArr.length > 0 ? true : false, channelId)
            this.updateReactionsArray(this.props.reactionsArr && this.props.reactionsArr.length > 0 ? this.props.reactionsArr : [], channelId)
            this.setState({
                isChatToggleEnabled: this.props.chatEnable,
                isReactionsEnabled: this.props.reactionsArr && this.props.reactionsArr.length > 0 ? true : false,
                reactionsArr: this.props.reactionsArr && this.props.reactionsArr.length > 0 ? this.props.reactionsArr : []
            }, () => {
                if (this.state.isReactionsEnabled) {
                    this.setReactionMapper();
                }
            })
        } else if (this.props.user == ATTENDEE || this.props.user == CO_HOST) {
            /** Putting a listener on call status(Used when the host ends the live stream)
             *  and navigating properly after the call has ended.
             *  
             */
            this.statusReference = database()
                .ref(ITEM_SEPERATOR + channelId + CALL_STATUS)
                .on('value', snapshot => {
                    if (!snapshot.val()) {
                        // Live Stream has ended 
                        if (this.props.videoMode == PREMIUM) {
                            // this.AgoraEngineRef.leaveChannel()
                        } else {
                            JitsiMeet.endCall();
                        }
                        this.setState({
                            callJoined: false
                        })
                        this.goBack();
                    } else {
                        // Increment the total live audience counter
                        this.updateLiveAudienceCount(true);
                    }
                });

            this.emoticonsReference = database()
                .ref(ITEM_SEPERATOR + channelId + SELECTED_EMOJI_ARRAY)
                .on('value', snapshot => {
                    let data = snapshot.val();
                    if (data && data.length > 0) {
                        let aTempObj = this.state.defaultReactionMaps
                        for (const element of data) {
                            aTempObj[element] = 0
                        }
                        this.setState({
                            defaultReactionMaps: aTempObj
                        })
                    }
                    this.setState({
                        reactionsArr: data && data.length > 0 ? data : []
                    })
                });
            this.emoticonsStatusReference = database()
                .ref(ITEM_SEPERATOR + channelId + EMOTICONS_STATUS)
                .on('value', snapshot => {
                    let data = snapshot.val();
                    if (data) {
                        this.setReactionMapper();
                    }
                    this.setState({
                        isReactionsEnabled: data ? data : false
                    })
                });
        }
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

    onOptionSelected(value) {
        clearTimeout(this.ansTimeout);
        this.setState({
            ansTime: new Date() - this.state.startTime
        }, () => {
            this.props.onOptionSelected(value, this.state.ansTime);
        })
    }

    onCloseQues() {
        this.setState({
            isQuesVisible: false
        })

        // Setting the current question to null in firebase
        database()
            .ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS)
            .update({
                currentQuestion: null
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
            const countReference = database().ref(ITEM_SEPERATOR + this.state.channelId + CHATS_COUNT)
                .transaction(totalComments => {
                    if (totalComments === null) return 1;
                    return totalComments + 1;
                })
                .then(transaction => { });
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
                .ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS + '/winnersList')
                .off('value', this.winnersListRef);
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + AUDIO_STATUS)
                .off('value', this.audioReference);
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + VIDEO_STATUS)
                .off('value', this.videoReference);
        }
        // Removing listener for chats
        database().ref(ITEM_SEPERATOR + this.state.channelId + CHATS)
            .off('child_added', this.dbReference);
        // Removing listener for chat count
        database().ref(ITEM_SEPERATOR + this.state.channelId + CHATS_COUNT)
            .off('child_added', this.commentsCountRef);
        // Removing listener for the viewer's count
        database().ref(ITEM_SEPERATOR + this.state.channelId + TOTAL_AUDIENCE)
            .off('value', this.countReference);
        if (this.props.user == CO_HOST || this.props.user == ATTENDEE) {
            // Removing listener for the co-host chat visibility
            database().ref(ITEM_SEPERATOR + this.state.channelId + CHAT_VISIBILITY)
                .off('value', this.chatReference);

            database().ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS + '/currentQuestion')
                .off('value', this.currentQuestion);

            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + CALL_STATUS)
                .off('value', this.statusReference);

            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + SELECTED_EMOJI_ARRAY)
                .off('value', this.emoticonsReference);
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + EMOTICONS_STATUS)
                .off('value', this.emoticonsStatusReference);
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

    _renderFanEmoticons = ({ item, index }) => {
        const emoji = EMOTICONS[item]
        return (
            <Pressable
                onPress={this.onReact.bind(this, item)}>
                <Text
                    style={Styles.emoticonStyle}>
                    {emoji}
                </Text>
            </Pressable>
        )
    }

    /**
     * Method that starts a listener that fetches the reaction count every second,
     * calculates the delta and updates in the Redux.
     * 
     */
    setReactionMapper() {
        this.recationListener = setTimeout(() => {
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
                        this.setState({
                            deltaReactions: deltaReactions,
                            currentTimeStamp: new Date().getTime()
                        })
                    } else {
                        // reactionArr.push(this.state.defaultReactionMaps);
                    }

                    this.props.setReactionMap(reactionArr);
                    this.setReactionMapper();
                });
        }, 1500);
    }

    /**
     * Method that get's called when the chat visiility switch is toggled.
     * 
     */
    toggleChat = () => {
        this.updateChatVisibility(!this.state.isChatToggleEnabled, this.state.channelId)
        this.setState({
            isChatToggleEnabled: !this.state.isChatToggleEnabled
        })
    }

    toggleReaction = () => {
        this.updateReactionsVisibility(!this.state.isReactionsEnabled, this.state.channelId)

        if (!this.state.isReactionsEnabled && this.state.reactionsArr.length == 0) {
            this.updateReactionsArray(DEFAULT_EMOTICON_ARRAY, this.state.channelId)
        }
        this.setState({
            reactionsArr: !this.state.isReactionsEnabled && this.state.reactionsArr.length == 0 ? DEFAULT_EMOTICON_ARRAY : this.state.reactionsArr,
            isReactionsEnabled: !this.state.isReactionsEnabled
        }, () => {
            if (this.state.isReactionsEnabled) {
                this.setReactionMapper();
            }
        })
    }

    toggleAudio = async () => {
        if (this.props.videoMode == PREMIUM) {
            // await this.AgoraEngineRef?.enableLocalAudio(!this.state.isAudioEnabled);
        } else {
            JitsiMeet.toggleAudio(this.state.isAudioEnabled)
        }
        database().ref(ITEM_SEPERATOR + this.state.channelId + SET_CALL_STATUS)
            .update({
                isAudioOn: !this.state.isAudioEnabled
            });
        this.setState({
            isAudioEnabled: !this.state.isAudioEnabled
        })
    }

    toggleVideo = async () => {
        if (this.props.videoMode == PREMIUM) {
            // await this.AgoraEngineRef?.enableLocalVideo(!this.state.isVideoEnabled);
        } else {
            JitsiMeet.toggleVideo(this.state.isVideoEnabled)
        }
        database().ref(ITEM_SEPERATOR + this.state.channelId + SET_CALL_STATUS)
            .update({
                isVideoOn: !this.state.isVideoEnabled
            });
        this.setState({
            isVideoEnabled: !this.state.isVideoEnabled
        })
    }

    /**
     * Updates the firebase with chat visibility
     * 
     * @param {*} value 
     */
    updateChatVisibility(value, channelId) {
        database().ref(ITEM_SEPERATOR + channelId + SET_CALL_STATUS)
            .update({
                chatVisible: value
            })
            .then(() => { });
    }

    /**
     * Updates the firebase with chat visibility
     * 
     * @param {*} value 
     */
    updateReactionsVisibility(value, channelId) {
        database().ref(ITEM_SEPERATOR + channelId + SET_CALL_STATUS)
            .update({
                reactionVisible: value
            })
            .then(() => { });
    }

    /**
    * Updates the firebase with emoticons
    * 
    * @param {*} value 
    */
    updateReactionsArray(value, channelId) {
        const reactionsNameArr = this.getReactionsArr(value)
        let aTempObj = this.state.defaultReactionMaps
        for (const element of reactionsNameArr) {
            aTempObj[element] = 0
        }
        this.setState({
            defaultReactionMaps: aTempObj
        })
        database().ref(ITEM_SEPERATOR + channelId + SET_CALL_STATUS)
            .update({
                reactionsArray: reactionsNameArr
            })
            .then(() => { });
    }

    getReactionsArr(value) {
        let arr = [];
        for (let i = 0; i < value.length; i++) {
            arr.push(Object.keys(EMOTICONS).find(key => EMOTICONS[key] === value[i]))
        }

        return arr;
    }

    /**
    * Updates the firebase that the {@link HOST} has ended the live stream or
    * the {@link ATTENDEE} has left the live stream
    * 
    */
    updateFirebase(currentRoomKey) {
        if (this.props.videoMode == PREMIUM) {
            // if (this.AgoraEngineRef !== undefined)
            //     this.AgoraEngineRef.leaveChannel()
        } else {
            JitsiMeet.endCall();
        }
        if (this.props.user == HOST) {
            const newReference = database().ref(ITEM_SEPERATOR + this.state.channelId + SET_CALL_STATUS);
            newReference.update({
                isActive: false,
                hostUid: 0,
                coHostUid: 0
            })
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
            database().ref(ITEM_SEPERATOR + ACTIVE_ROOMS_LIST + ITEM_SEPERATOR + currentRoomKey)
                .set({
                    roomName: null
                })
        } else if (this.props.user == ATTENDEE) {
            if (this.state.channelId != null && this.state.channelId.length > 0) {
                this.updateLiveAudienceCount(false);
            }
            this.props.onClearData();
        } else if (this.props.user == CO_HOST) {
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

    onCloseWinnersList() {
        this.setState({
            isWinnersListVisible: false,
            // winnersList: []
        })

        // Updating the winners list to null in firebase
        database()
            .ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS)
            .update({
                winnersList: null
            })
    }

    onShowResult() {
        if (this.props.winnersList > 0) {
            this.setState({
                isWinnersListVisible: true,
                winnersList: this.props.winnersList
            })
        } else
            this.props.getFinalResults();
    }

    listenToWinnersList(channelId) {
        this.winnersListRef = database()
            .ref(ITEM_SEPERATOR + channelId + QUESTIONS + '/winnersList')
            .on('value', snapshot => {
                if (snapshot.val()) {
                    this.setState({
                        winnersList: snapshot.val,
                        isWinnersListVisible: true
                    })
                }
            });
    }

    getUserHelpers = () => {
        const { isAudioEnabled, isVideoEnabled } = this.state
        let userText = !isAudioEnabled ? "Host has muted self" : ""
        userText = !isVideoEnabled ? "Host has turned off the camera" : userText
        userText = !isAudioEnabled && !isVideoEnabled ? "Host has turned off the camera & muted self" : userText

        const imageRootStyle = !isAudioEnabled && !isVideoEnabled ? Styles.userRootSmallImageStyle : Styles.userRootLargeImageStyle
        const imageStyle = !isAudioEnabled && !isVideoEnabled ? Styles.userHelpSmallImageStyle : Styles.userHelpImageStyle


        return (
            <View
                style={Styles.userHelperRoot}>
                <View
                    style={Styles.horizontalRoot}>
                    {
                        !isVideoEnabled ?
                            <View
                                style={[Styles.userHelpImageRootStyle, Styles.imageRootStyle]}>
                                <Image
                                    style={imageStyle}
                                    source={require('../assets/images/video.png')}
                                />
                            </View>
                            : null}
                    {
                        !isAudioEnabled ?
                            <View
                                style={[Styles.userHelpImageRootStyle, Styles.imageRootStyle]}>
                                <Image
                                    style={imageStyle}
                                    source={require('../assets/images/audio.png')}
                                />
                            </View>
                            : null
                    }
                </View>
                <Text
                    style={Styles.userHelperTextStyle}>
                    {userText}
                </Text>
            </View>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentQuestion != null &&
            this.props.resultForQues.title == prevState.currentQuestion.title &&
            this.props.resultForQues.answered != prevState.currentQuestion.answered) {
            let quesList = [...this.state.questionsList]
            let i = 0;
            for (i = 0; i < quesList.length; i++) {
                if (quesList[i].title === this.props.resultForQues.title) {
                    break;
                }
            }
            quesList[i] = this.props.resultForQues;
            this.setState({
                currentQuestion: this.props.resultForQues,
                questionsList: quesList,
            })
            console.log("Updating firebase in didUpdate : ", this.props)
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS)
                .update({
                    currentQuestion: this.props.resultForQues
                })
        } else if (this.props.winnersList.length != prevState.winnersList.length) {
            this.setState({
                isWinnersListVisible: true,
                winnersList: this.props.winnersList
            })
            database()
                .ref(ITEM_SEPERATOR + this.state.channelId + QUESTIONS)
                .update({
                    winnersList: this.props.winnersList
                })
        }
    }

    render() {
        const { user, videoMode } = this.props;
        const { callJoined, isChatToggleEnabled, isReactionsEnabled, isChatEnable, questionsList, totalComments, pollTimer, isAudioEnabled, isVideoEnabled, deltaReactions,
            currentQuestion, winnersList, hostUid, coHostUid, isQuesVisible, isWinnersListVisible, channelId, reactionsArr, chatlist, isPoll, currentTimeStamp, toShowTimer } = this.state;
        console.log("Winners List in Render: ", winnersList)

        let commentsText = isChatToggleEnabled ? totalComments + ' Comments' : 'Comments turned off';
        let leaveLabel = isPoll && user == HOST ? "End Poll" : Strings.LEAVE
        return (
            <View style={{ backgroundColor: Colors.APP_DARK_BLUE, flex: 1, width: '100%', height: '100%' }}>
                {videoMode == PREMIUM ?
                    <View
                        style={Styles.root}>

                    </View>
                    :
                    <View
                        style={Styles.root}>
                        {user == ATTENDEE && !isVideoEnabled ?
                            null :
                            <JitsiMeetView
                                onConferenceTerminated={this.onConferenceTerminated}
                                onConferenceJoined={this.onConferenceJoined}
                                onConferenceWillJoin={this.onConferenceWillJoin}
                                style={{ flex: 1, height: '100%', width: '100%' }} />
                        }
                    </View>
                }
                {callJoined ?
                    <View style={Styles.toolbarRoot}>
                        {
                            (user == HOST || user == CO_HOST) && !isPoll ?
                                <ToolbarComp
                                    onCancelCall={this.endCall}
                                    onFlashOff={this.toggleFlash}
                                    onFlashOn={this.toggleFlash}
                                    onSwitchCamera={this.onSwitchCamera} />
                                : null
                        }

                        <LiveCounterComp
                            totalCount={this.props.chats.liveAudienceCount}
                            style={Styles.liveCounterStyle} />
                    </View>
                    : null
                }
                {
                    user == ATTENDEE && (!isAudioEnabled || !isVideoEnabled) ?
                        this.getUserHelpers()
                        : null
                }
                {callJoined && !isPoll ?
                    <View style={Styles.chatRoot}>
                        {
                            user == ATTENDEE && !isChatEnable ?
                                null :
                                <UserInteractionBottomComp
                                    chatList={chatlist}
                                    totalComments={totalComments}
                                    endCall={this.endCall}
                                    reactionArr={reactionsArr}
                                    deltaReactions={deltaReactions}
                                    onReaction={this.onReact.bind(this)}
                                    onReactionsEnabled={isReactionsEnabled}
                                    currentTimeStamp={currentTimeStamp}
                                    user={user} />
                        }

                        {
                            user == HOST ?
                                <HostOptionsComp
                                    style={Styles.hostOptionsRoot}
                                    onMessageEnabled={isChatToggleEnabled}
                                    onMessageToggle={this.toggleChat}
                                    onReactionEnabled={isReactionsEnabled}
                                    onReactionToggle={this.toggleReaction}
                                    reactionArr={reactionsArr}
                                    onCameraEnabled={isVideoEnabled}
                                    onCameraToggle={this.toggleVideo}
                                    onMikeEnabled={isAudioEnabled}
                                    onMikeToggle={this.toggleAudio} />
                                : null
                        }
                        {
                            user == HOST ?
                                <View
                                    style={Styles.bottomRoot}>
                                    {isChatToggleEnabled ?
                                        <Image
                                            style={Styles.tint}
                                            source={require('../assets/images/comment.png')} />
                                        : null
                                    }
                                    <Text
                                        style={Styles.commentsCountRoot}>
                                        {commentsText}
                                    </Text>
                                    <ButtonComp
                                        label={"End Livestream"}
                                        onPress={this.endCall} />
                                </View>
                                : null
                        }
                        {
                            user == ATTENDEE && isChatEnable ?
                                <KeyboardAvoidingView
                                    style={Styles.bottomRoot}>
                                    <TextInput
                                        style={Styles.msgRoot}
                                        placeholder={Strings.ENTER_MESSAGE}
                                        onChangeText={this.onMsgUpdated.bind(this)}
                                        value={this.state.msg}
                                        placeholderTextColor={Colors.THUMB_COLOR_DISABLED} />

                                    <ButtonComp
                                        buttonStyle={{ backgroundColor: '#FF3EA6' }}
                                        label={"Send"}
                                        onPress={this.onSendMsg.bind(this)} />
                                </KeyboardAvoidingView>
                                : null
                        }

                    </View>
                    : null
                }
                {
                    (user == ATTENDEE && callJoined) || isPoll ?
                        <ButtonComp
                            buttonStyle={[{ backgroundColor: '#FF3EA6' }]}
                            style={Styles.leaveBtnStyle}
                            label={leaveLabel}
                            onPress={this.endCall} />
                        : null
                }
                {
                    isPoll && reactionsArr.length > 0 ?
                        <View
                            style={Styles.chatRoot}>
                            <AnimatedEmoticonsComp
                                deltaReactions={deltaReactions}
                                timeStamp={currentTimeStamp} />
                        </View>
                        : null
                }
                {
                    user == HOST && callJoined && isPoll ?
                        <PollList
                            quesList={questionsList}
                            askQues={this.askQuestion.bind(this)}
                            showResult={this.onShowResult.bind(this)} />
                        : null
                }

                {
                    isPoll && isQuesVisible ?
                        <View
                            style={Styles.pollTimerRoot}>
                            {!currentQuestion.answered && pollTimer > 0 ?
                                <ImageTextComp
                                    value={pollTimer + ' sec'}
                                    imgSrc={'../assets/images/close.png'} />
                                : null
                            }
                            {
                                currentQuestion && currentQuestion.answered ?
                                    <ImageTextComp
                                        value={1654}
                                        imgSrc={'../assets/images/close.png'} />
                                    : null}

                        </View>
                        : null
                }
                {
                    isPoll ?
                        <QuizComponent
                            isVisible={isQuesVisible}
                            question={currentQuestion}
                            user={user}
                            optionSelected={this.onOptionSelected.bind(this)}
                            onCloseQues={this.onCloseQues.bind(this)} />
                        : null
                }
                {
                    isPoll ?
                        <WinnersComp
                            isVisible={isWinnersListVisible}
                            onCloseWinnersList={this.onCloseWinnersList.bind(this)}
                            winnersList={winnersList} />
                        : null
                }
                {
                    isPoll && user == ATTENDEE && reactionsArr.length > 0 ?
                        <FlatList
                            data={reactionsArr}
                            extraData={this.state}
                            renderItem={this._renderFanEmoticons}
                            style={Styles.emojiRootStyle}
                            horizontal={true}
                            contentContainerStyle={Styles.emojiContentStyle} />
                        : null
                }
                {
                    toShowTimer ?
                        <CallCountdownComp
                            timeUp={() => {
                                this.setState({
                                    currentQuestion: null,
                                    isQuesVisible: false,
                                    isWinnersListVisible: false
                                })
                                this.props.onCallEnded();
                            }} />
                        : null
                }
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        color: Colors.APP_DARK_BLUE,
    },
    toolbarRoot: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    bottomRoot: {
        zIndex: 9999,                              // Just to handle click on top of comments modal
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimens.dimen_56,
        paddingHorizontal: Dimens.dimen_16,
        backgroundColor: Colors.DARK_BACKGROUND,
    },
    chatRoot: {
        height: windowHeight * 0.6,
        width: windowWidth,
        position: 'absolute',
        left: Dimens.dimen_0,
        bottom: Dimens.dimen_0,
        justifyContent: 'flex-end',
    },
    msgRoot: {
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_4,
        marginEnd: Dimens.dimen_4,
        borderRadius: Dimens.dimen_8,
        borderWidth: Dimens.dimen_2,
        flex: 1,
        borderColor: Colors.WHITE,
        color: Colors.THUMB_COLOR_DISABLED,
        backgroundColor: Colors.WHITE,
        fontFamily: "SFUIText-Regular",
        fontWeight: "400"
    },
    commentsCountRoot: {
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_4,
        color: Colors.WHITE,
        fontSize: Dimens.font_14,
        flex: 1,
        fontFamily: "SFUIText-Regular",
        fontWeight: "500"
    },
    horizontalRoot: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userHelperRoot: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        alignSelf: 'baseline',
        start: 0,
        end: 0
    },
    userRootLargeImageStyle: {
        width: Dimens.dimen_124,
        height: Dimens.dimen_124,
    },
    userRootSmallImageStyle: {
        width: Dimens.dimen_96,
        height: Dimens.dimen_96,
    },
    userHelpImageRootStyle: {
        backgroundColor: Colors.APP_DARK_BLUE_TRANSPARENT,
        borderWidth: Dimens.dimen_10,
        borderRadius: Dimens.dimen_64,
        borderColor: Colors.WHITE_TRANSPARENT,
        padding: Dimens.dimen_24,
        margin: Dimens.dimen_8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userHelpImageStyle: {
        width: Dimens.dimen_64,
        height: Dimens.dimen_64,
        tintColor: Colors.WHITE
    },
    userHelpSmallImageStyle: {
        width: Dimens.dimen_56,
        height: Dimens.dimen_56,
        tintColor: Colors.WHITE
    },
    userHelperTextStyle: {
        fontSize: Dimens.font_16,
        color: Colors.WHITE,
        fontFamily: "SFUIText-Regular",
        fontWeight: "500"
    },
    buttonStyle: {
        marginHorizontal: Dimens.dimen_4
    },
    leaveBtnStyle: {
        backgroundColor: '#FF3EA6',
        borderRadius: Dimens.dimen_4,
        position: 'absolute',
        right: Dimens.dimen_0,
        top: Dimens.dimen_0,
        margin: Dimens.dimen_24,
        paddingHorizontal: Dimens.dimen_12,
    },
    liveCounterStyle: {
        margin: Dimens.dimen_16,
    },
    tilescreen: {
        width: windowWidth - 8,
        height: windowHeight / 2 - 4,
        backgroundColor: Colors.WHITE,
        borderRadius: Dimens.dimen_8,
        marginHorizontal: Dimens.dimen_4,
        marginVertical: Dimens.dimen_2
    },
    fullscreen: {
        width: windowWidth,
        height: windowHeight,
        // backgroundColor: Colors.WHITE
    },
    hostOptionsRoot: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0
    },
    pollTimerRoot: {
        position: 'absolute',
        right: 0,
        top: 100
    },
    emoticonStyle: {
        fontSize: Dimens.font_20,
        marginHorizontal: Dimens.dimen_12,
        margin: Dimens.dimen_8,
        padding: Dimens.dimen_4,
        textAlign: 'center',
        alignSelf: 'baseline'
    },
    emojiRootStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.APP_DARK_BLUE,
        height: Dimens.dimen_56
    },
    emojiContentStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around'
    },
    tint: {
        tintColor: Colors.WHITE
    }
})

const mapStateToProps = (state) => {
    const { chats } = state
    return { chats }
};

export default connect(mapStateToProps, { onUpdateCount, onClearData, onUpdateReactionMapper, setReactionMap })(LiveStreamComp)