import React, { Component } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    FlatList,
    Dimensions
} from "react-native";
import { color } from 'react-native-reanimated';
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

const windowWidth = Dimensions.get('window').width;

/**
 * Stateless component for toggling options in stream
 * 
 * @param {*} param0 
 */

class HostOptionsComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        }
    }

    onEnableReactions() {
        if (this.props.onReactionEnabled) {
            this.setState({
                expanded: !this.state.expanded
            })
        } else {
            this.props.onReactionToggle();
            this.setState({
                expanded: false
            })
        }
    }

    onDisableReactions() {
        this.props.onReactionToggle();
        this.setState({
            expanded: false
        })
    }

    onMikeToggle() {
        this.props.onMikeToggle();
    }

    onCameraToggle() {
        this.props.onCameraToggle();
    }

    onMessageToggle() {
        this.props.onMessageToggle();
    }

    componentDidMount() {
        this.emojiComponents = this.props.reactionArr.map((item) => {
            return (
                <Text
                    style={Styles.emoticonStyle}>
                    {item}
                </Text>
            )
        });
    }

    render() {
        const { style, onMessageEnabled, onReactionEnabled, onCameraEnabled, onMikeEnabled, reactionArr } = this.props
        const { expanded } = this.state
        let emojiComponents = reactionArr.map((item) => {
            return (
                <Text
                    style={Styles.emoticonStyle}>
                    {item}
                </Text>
            )
        });
        return (
            <View
                style={[Styles.root, style]}>
                <Pressable
                    onPress={this.onMessageToggle.bind(this)}
                    style={[onMessageEnabled ? Styles.btnStyleNormal : Styles.btnStyleUnselected, Styles.borderStyle]}>
                    <Image
                        style={Styles.cta}
                        source={require('../../assets/images/comment.png')} />
                </Pressable>
                <View
                    style={Styles.expandedRoot}>
                    {expanded ?
                        <View
                            style={Styles.expandedSubRoot}>
                            {emojiComponents}
                            <Pressable
                                onPress={this.onDisableReactions.bind(this)}>
                                <Image
                                    style={Styles.bigCta}
                                    source={require('../../assets/images/send.png')} />
                            </Pressable>
                        </View>
                        : null
                    }
                    <Pressable
                        onPress={this.onEnableReactions.bind(this)}
                        style={[onReactionEnabled ? Styles.btnStyleNormal : Styles.btnStyleUnselected, { height: 32, width: 32 }]}>
                        <Image
                            style={Styles.cta}
                            source={require('../../assets/images/send.png')} />
                    </Pressable>
                </View>
                <Pressable
                    onPress={this.onCameraToggle.bind(this)}
                    style={[onCameraEnabled ? Styles.btnStyleNormal : Styles.btnStyleUnselected, Styles.borderStyle]}>
                    <Image
                        style={Styles.cta}
                        source={require('../../assets/images/video.png')} />
                </Pressable>
                <Pressable
                    onPress={this.onMikeToggle.bind(this)}
                    style={[onMikeEnabled ? Styles.btnStyleNormal : Styles.btnStyleUnselected, Styles.borderStyle]}>
                    <Image
                        style={Styles.cta}
                        source={require('../../assets/images/audio.png')} />
                </Pressable>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    root: {
        padding: Dimens.dimen_16,
        marginBottom: Dimens.dimen_42,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        zIndex: 9999,
    },
    expandedRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimens.dimen_36,
        backgroundColor: Colors.WHITE_TRANSPARENT,
        borderRadius: Dimens.dimen_24,
        marginStart: Dimens.dimen_72,
        marginVertical: Dimens.dimen_12,
        borderWidth: Dimens.dimen_2,
        borderColor: Colors.WHITE_TRANSPARENT,

    },
    expandedSubRoot: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnStyleNormal: {
        width: Dimens.dimen_36,
        height: Dimens.dimen_36,
        borderRadius: Dimens.dimen_18,
        backgroundColor: Colors.BLACK_TRASNPARENT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyleUnselected: {
        width: Dimens.dimen_36,
        height: Dimens.dimen_36,
        borderRadius: Dimens.dimen_18,
        backgroundColor: Colors.GREY_TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cta: {
        width: Dimens.dimen_14,
        height: Dimens.dimen_14,
        tintColor: Colors.WHITE
    },
    bigCta: {
        width: Dimens.dimen_16,
        height: Dimens.dimen_16,
        padding: Dimens.dimen_8,
        marginHorizontal: Dimens.dimen_12,
    },
    listContainerStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    borderStyle: {
        marginVertical: Dimens.dimen_12,
        borderWidth: Dimens.dimen_2,
        borderColor: Colors.WHITE_TRANSPARENT
    },
    emoticonStyle: {
        fontSize: Dimens.font_18,
        backgroundColor: Colors.EMOTICONS_BACKGROUND,
        borderRadius: Dimens.dimen_21,
        marginHorizontal: Dimens.dimen_12,
        paddingHorizontal: Dimens.dimen_4,
        paddingVertical: Dimens.dimen_2
    }
})
export default HostOptionsComp;