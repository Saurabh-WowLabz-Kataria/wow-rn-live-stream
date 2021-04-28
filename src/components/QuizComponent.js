import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'
import { Modal, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';

/**
 * Props: 
 * - isvisibile
 * - optionsList
 */
class QuizComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionsList: props.question ? props.question.options : null,
            selectedItemId: ''
        }
    }
    onSelectOption(value) {
        console.log("Value selected : ", value)
        this.setState({
            selectedItemId: value
        }, () => {
            this.props.optionSelected(value);
            this.setState({
                selectedItemId: ""
            })
        })
    }

    /**
    * Method that returns the item component for options list
    * 
    * @param {*} param0 
    */
    _renderItemComponent = ({ item, index }) => {
        console.log("Item value : ", item)
        const extraStyle = item == this.state.selectedItemId ? Styles.extraSelectedStyle : null;
        return (
            <TouchableOpacity
                onPress={this.onSelectOption.bind(this, item)}>
                <Text
                    style={[Styles.optionsTextStyle, extraStyle]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { isVisible, question } = this.props;

        return (
            <Modal
                visible={isVisible}
                onTouchOutside={() => { }}
                modalTitle={
                    <ModalTitle
                        title={question ? question.title : ''}
                        align="center"
                    />
                }
                width={0.9}
                modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                })}>
                <ModalContent
                    style={{ alignItems: 'center' }}
                >
                    <FlatList
                        data={question ? question.options : []}
                        extraData={this.state}
                        renderItem={this._renderItemComponent}
                        style={Styles.flatlistStyle}
                        contentContainerStyle={Styles.listContainerStyle} />
                </ModalContent>
            </Modal>
        );
    }
}

const Styles = StyleSheet.create({
    flatlistStyle: {
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_4,
        // flexWrap: "wrap"

    },
    listContainerStyle: {
        width: '100%'
    },
    optionsTextStyle: {
        fontSize: Dimens.font_16,
        borderColor: Colors.BLACK,
        textAlign: 'center',
        alignSelf: 'stretch',
        borderRadius: Dimens.dimen_8,
        borderWidth: Dimens.dimen_1,
        backgroundColor: Colors.WHITE,
        color: Colors.BLACK,
        margin: Dimens.dimen_4,
        paddingHorizontal: Dimens.dimen_8,
        paddingVertical: Dimens.dimen_4
    },
    extraSelectedStyle: {
        backgroundColor: Colors.THUMB_COLOR_DISABLED
    }
})
export default QuizComponent;