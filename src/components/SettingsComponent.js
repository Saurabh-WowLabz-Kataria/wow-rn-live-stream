import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    Switch,
    Pressable
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'
import { EMOTICONS } from '../utils/Constants';
import ButtonComp from './ButtonComp';
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;

class SettingsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: Object.keys(EMOTICONS),
            emoticons: Object.values(EMOTICONS),
            isChatToggleEnabled: true,
            isReactionEnabled: false,
            selectedReactions: []
        }
    }

    /**
    * Method that returns the message item component for chat list
    * 
    * @param {*} param0 
    */
    _renderItemComponent = ({ item, index }) => {
        return (
            <Pressable
                style={Styles.itemStyle}
                onPress={this.updateSelection.bind(this, item)}>
                <Text
                    style={this.state.selectedReactions.includes(item) ? Styles.selectedEmoticonStyle : Styles.emoticonStyle}>
                    {item}
                </Text>
            </Pressable>
        )
    }

    updateSelection(item, index) {
        const selectionArr = this.state.selectedReactions
        if (selectionArr.includes(item)) {
            const index = selectionArr.indexOf(item);
            if (index > -1) {
                selectionArr.splice(index, 1);
            }
        } else {
            if (selectionArr.length == 5) {
                Toast.show('Already selected 5 options.');
            } else {
                selectionArr.push(item)
            }
        }
        this.setState({
            selectedReactions: selectionArr
        })
    }

    toggleComments = () => {
        this.setState({
            isChatToggleEnabled: !this.state.isChatToggleEnabled
        })
    }

    toggleReactions = () => {
        this.setState({
            isReactionEnabled: !this.state.isReactionEnabled,
            selectedReactions: []
        })
    }

    _flatListHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: Colors.APP_DARK_BLUE
                }}>
                <View>
                    <Text
                        style={Styles.smallTitleStyle}>
                        Select upto 5 Emojis for reactions
                    </Text>
                    <Text
                        style={Styles.smallDescStyle}>
                        Participants will only be able to react from the selected emojis
                    </Text>
                </View>
            </View>
        );
    }

    onStartCall() {
        if (this.state.isReactionEnabled && this.state.selectedReactions.length == 0) {
            Toast.show('Please select atleast 1 reaction or turn off reactions to continue');
        } else {
            this.props.onStartCall(this.state.isChatToggleEnabled, this.state.selectedReactions);
        }
    }

    onEndCall() {
        this.props.onEndCall();
    }

    render() {
        const { isChatToggleEnabled, isReactionEnabled } = this.state;
        return (
            <View style={Styles.contentStyle}>
                <Image
                    style={Styles.cancelStyle}
                    source={require('../../assets/images/close.png')} />
                <View
                    style={[Styles.horizontalRoot, { marginTop: Dimens.dimen_36 }]}>
                    <Image
                        style={Styles.imageStyle}
                        source={require('../../assets/images/audio.png')} />
                    <Text
                        style={Styles.titleStyle}>
                        Settings
                    </Text>
                </View>
                <View
                    style={[Styles.horizontalRoot, Styles.strechItems]}>
                    <View>
                        <Text
                            style={Styles.smallTitleStyle}>
                            Turn off Comments
                        </Text>
                        <Text
                            style={Styles.smallDescStyle}>
                            Participants will not be able to add comments
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: Colors.THUMB_BACKGROUND, true: Colors.THUMB_BACKGROUND }}
                        thumbColor={isChatToggleEnabled ? Colors.THUMB_APP_BLUE : Colors.THUMB_COLOR_DISABLED}
                        ios_backgroundColor={Colors.THUMB_BACKGROUND}
                        onValueChange={this.toggleComments}
                        value={isChatToggleEnabled} />
                </View>
                <View
                    style={[Styles.horizontalRoot, Styles.strechItems]}>
                    <View>
                        <Text
                            style={Styles.smallTitleStyle}>
                            Turn off Reactions
                        </Text>
                        <Text
                            style={Styles.smallDescStyle}>
                            Participants will not be able to react to your live stream
                        </Text>
                    </View>
                    <Switch
                        trackColor={{ false: Colors.THUMB_BACKGROUND, true: Colors.THUMB_BACKGROUND }}
                        thumbColor={isReactionEnabled ? Colors.THUMB_APP_BLUE : Colors.THUMB_COLOR_DISABLED}
                        ios_backgroundColor={Colors.THUMB_BACKGROUND}
                        onValueChange={this.toggleReactions}
                        value={isReactionEnabled} />
                </View>
                {
                    isReactionEnabled ?
                        <FlatList
                            data={this.state.emoticons}
                            extraData={this.state}
                            renderItem={this._renderItemComponent}
                            ListHeaderComponent={this._flatListHeader}
                            stickyHeaderIndices={[0]}
                            numColumns={4}
                            style={Styles.flatlistStyle}
                            contentContainerStyle={Styles.listContainerStyle} />
                        : null
                }
                <View
                    style={[Styles.horizontalRoot, Styles.bottomRoot]}>
                    <Pressable
                        onPress={this.onEndCall.bind(this)}
                        style={{ marginEnd: Dimens.dimen_36 }}>
                        <Text
                            style={Styles.smallTitleStyle}>
                            Cancel
                        </Text>
                    </Pressable>
                    <ButtonComp
                        label={'Start'}
                        onPress={this.onStartCall.bind(this)}
                        style={{ alignItems: 'baseline' }}
                    />
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    flatlistStyle: {
        flex: 1,
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_42,
    },
    listContainerStyle: {
        // flex: 1,
        alignItems: 'stretch',
    },
    contentStyle: {
        flex: 1,
        backgroundColor: Colors.APP_DARK_BLUE,
        width: windowWidth,
        padding: Dimens.dimen_16,
        paddingTop: Dimens.dimen_24
    },
    cancelStyle: {
        padding: Dimens.dimen_12,
        tintColor: Colors.WHITE
    },
    imageStyle: {
        marginEnd: Dimens.dimen_8,
        width: Dimens.dimen_16,
        height: Dimens.dimen_16,
        tintColor: Colors.WHITE
    },
    titleStyle: {
        fontSize: Dimens.font_18,
        color: Colors.WHITE
    },
    smallTitleStyle: {
        fontSize: Dimens.font_14,
        color: Colors.WHITE
    },
    smallDescStyle: {
        fontSize: Dimens.font_12,
        color: Colors.WHITE
    },
    horizontalRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Dimens.dimen_24
    },
    strechItems: {
        justifyContent: 'space-between',
    },
    itemStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Dimens.dimen_16
    },
    emoticonStyle: {
        fontSize: Dimens.font_18,
        backgroundColor: Colors.EMOTICONS_BACKGROUND,
        padding: Dimens.dimen_8,
        borderRadius: 25
    },
    selectedEmoticonStyle: {
        fontSize: Dimens.font_18,
        backgroundColor: Colors.EMOTICONS_BACKGROUND_SELECTED,
        padding: Dimens.dimen_8,
        borderRadius: 25
    },
    bottomRoot: {
        margin: Dimens.dimen_16,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 0,
        end: 0
    }
})
export default SettingsComponent;