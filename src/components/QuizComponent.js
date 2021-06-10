import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Pressable
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals';
import { ATTENDEE } from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';

class QuizComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsList: props.question ? props.question.options : null,
            selectedItemId: ''
        }
    }
    onSelectOption(value) {
        if (!this.props.question.answered) {
            this.setState({
                selectedItemId: value
            }, () => {
                this.props.optionSelected(value);
            })
        }
    }

    /**
    * Method that returns the item component for options list
    * 
    * @param {*} param0 
    */
    _renderItemComponent = ({ item, index }) => {
        const { question } = this.props
        const ansStyleCondition = !question.answered && this.state.selectedItemId.option == item.option
        let optionTextColor = item.option === this.props.question.correctAns ? Colors.WHITE : Colors.BLACK;
        optionTextColor = question.answered ? optionTextColor : Colors.BLACK

        let backgroundSelectionColor = item.option === this.props.question.correctAns ? !question.answered ? Colors.WHITE : Colors.APP_BLUE : Colors.QUIZ_WRONG_ANS_BACKGROUND;
        backgroundSelectionColor = question.answered ? backgroundSelectionColor : Colors.WHITE

        return (
            <TouchableOpacity
                onPress={this.props.user == ATTENDEE ? this.onSelectOption.bind(this, item) : null}>
                <View
                    style={ansStyleCondition ? Styles.selectedBorder : null}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        locations={[item.result / 100, item.result / 100, 1]}
                        colors={[
                            ansStyleCondition ? Colors.QUIZ_WRONG_ANS_BACKGROUND : backgroundSelectionColor,
                            ansStyleCondition ? Colors.QUIZ_WRONG_ANS_BACKGROUND : Colors.WHITE,
                            ansStyleCondition ? Colors.QUIZ_WRONG_ANS_BACKGROUND : Colors.WHITE
                        ]}
                        style={[Styles.itemBackground, { flexDirection: 'row', alignItems: 'center' }]}>
                        <Text
                            style={[Styles.optionsTextStyle, { color: optionTextColor }]}>
                            {item.option}
                        </Text>
                        {
                            this.state.selectedItemId.option == item.option ?
                                <Image
                                    source={require('../../assets/images/close.png')}
                                />
                                : null
                        }
                        {
                            question.answered ?
                                <Text
                                    style={[Styles.resultTextStyle]}>
                                    {item.result}%
                                </Text>
                                : null
                        }
                    </LinearGradient>

                </View>
            </TouchableOpacity>
        )
    }

    onCloseQues() {
        this.props.onCloseQues();
    }

    render() {
        const { isVisible, question } = this.props;

        return (
            <Modal
                visible={isVisible}
                onTouchOutside={() => { }}
                width={0.9}
                backgroundColor={Colors.RED}
                overlayOpacity={0.1}
                modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}
                modalStyle={{
                    backgroundColor: Colors.WHITE_QUIZ_TRANSPARENT
                }}>
                <ModalContent>
                    <View
                        style={Styles.root}>
                        <View
                            style={Styles.subHorizontalRoot}>
                            <Text
                                style={Styles.titleStyle}>
                                Question
                                </Text>
                            <Pressable
                                onPress={this.onCloseQues.bind(this)}>
                                <Image
                                    source={require('../../assets/images/close.png')} />
                            </Pressable>
                        </View>
                        <Text
                            style={[Styles.titleStyle, { marginVertical: Dimens.dimen_12 }]}>
                            {question ? question.title : ""}
                        </Text>
                        <FlatList
                            data={question ? question.options : []}
                            extraData={this.state}
                            renderItem={this._renderItemComponent}
                            style={Styles.flatlistStyle}
                            contentContainerStyle={Styles.listContainerStyle} />
                    </View>
                </ModalContent>
            </Modal>
        );
    }
}

const Styles = StyleSheet.create({
    root: {
        paddingVertical: Dimens.dimen_12,
        paddingHorizontal: Dimens.dimen_8,
    },
    subHorizontalRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleStyle: {
        fontSize: Dimens.font_16,
        color: Colors.POLL_TEXT_COLOR
    },
    flatlistStyle: {
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_4,
    },
    listContainerStyle: {
        width: '100%'
    },
    itemBackground: {
        borderRadius: Dimens.dimen_8,
        borderWidth: Dimens.dimen_1,
        backgroundColor: Colors.QUIZ_GREY,
        borderColor: Colors.QUIZ_BORDER_GREY,
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_8
    },
    optionsTextStyle: {
        fontSize: Dimens.font_14,
        alignSelf: 'stretch',
        color: Colors.POLL_TEXT_COLOR,
        margin: Dimens.dimen_4,
        flex: 1
    },
    selectedBorder: {
        borderRadius: Dimens.dimen_4,
        borderWidth: Dimens.dimen_2,
        borderColor: Colors.APP_BLUE
    },
    resultTextStyle: {
        fontSize: Dimens.font_11,
        color: Colors.THUMB_COLOR_DISABLED,
    }
})
export default QuizComponent;