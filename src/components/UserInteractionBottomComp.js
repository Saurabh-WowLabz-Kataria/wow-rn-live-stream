import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Text,
    Pressable
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'
import { Modalize } from 'react-native-modalize';
import MessageComp from './MessageComp';
import AnimatedEmoticonsComp from './AnimatedEmoticonsComp';
import { ATTENDEE, EMOTICONS } from '../utils/Constants';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class UserInteractionBottomComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
        }

        this.modalizeRef = React.createRef();

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

    onReaction(value) {
        this.props.onReaction(value);
    }

    _renderFanEmoticons = ({ item, index }) => {
        const emoji = EMOTICONS[item]
        return (
            <Pressable
                onPress={this.onReaction.bind(this, item)}>
                <Text
                    style={Styles.emoticonStyle}>
                    {emoji}
                </Text>
            </Pressable>
        )
    }

    componentDidMount() {
        this.setState({
            chatList: this.props.chatList
        }, () => {
            setTimeout(() => {
                this.modalizeRef.current.open('top')
            }, 350);
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.chatList !== this.props.chatList) {
            this.setState({
                chatList: this.props.chatList
            })
        }
    }

    render() {
        const { chatList } = this.state;
        const { reactionArr, deltaReactions, user, onReactionsEnabled, currentTimeStamp } = this.props;
        return (
            <Modalize
                // ref={ref => this.modalizeRef = ref}
                ref={this.modalizeRef}
                alwaysOpen={6}
                modalHeight={windowHeight * 0.50}
                withOverlay={false}
                handleStyle={{
                    paddingHorizontal: Dimens.dimen_8,
                    paddingVertical: Dimens.dimen_4,
                    backgroundColor: Colors.WHITE
                }}>
                <View style={Styles.contentStyle}>
                    <FlatList
                        data={chatList}
                        extraData={this.state}
                        renderItem={this._renderItemComponent}
                        style={Styles.flatlistStyle}
                        ref={ref => this.flatList = ref}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        contentContainerStyle={Styles.listContainerStyle} />
                    {
                        user == ATTENDEE && onReactionsEnabled ?
                            <FlatList
                                data={reactionArr}
                                extraData={this.state}
                                renderItem={this._renderFanEmoticons}
                                style={Styles.emojiRootStyle}
                                contentContainerStyle={Styles.emojiContentStyle} />
                            : null
                    }
                </View>
                <AnimatedEmoticonsComp
                    // deltaReactions={{ robot_face: 2, nerd_face: 3, face_with_thermometer: 2, face_with_head_bandage: 1 }}
                    deltaReactions={deltaReactions}
                    timeStamp={currentTimeStamp} />
            </Modalize>
        );
    }
}

const Styles = StyleSheet.create({
    flatlistStyle: {
        flexGrow: 0,
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_4,
        alignSelf: 'flex-end',
        width: windowWidth * 0.6
    },
    listContainerStyle: {
        flex: 0
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'row',
        height: windowHeight * 0.50,
    },
    emojiRootStyle: {
        alignSelf: 'flex-end',
        margin: Dimens.dimen_16
    },
    emojiContentStyle: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    emoticonStyle: {
        fontSize: Dimens.font_20,
        borderColor: Colors.EMOTICONS_BACKGROUND,
        borderWidth: Dimens.dimen_2,
        backgroundColor: Colors.APP_DARK_BLUE,
        borderRadius: Dimens.dimen_21,
        marginHorizontal: Dimens.dimen_12,
        margin: Dimens.dimen_8,
        padding: Dimens.dimen_4,
        textAlign: 'center',
        alignSelf: 'baseline'
    }
})
export default UserInteractionBottomComp;