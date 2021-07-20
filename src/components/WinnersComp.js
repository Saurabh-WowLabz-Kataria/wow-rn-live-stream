import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Pressable,
    ImageBackground
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'
import { Modal, SlideAnimation, ModalContent } from 'react-native-modals';

class WinnersComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            winnersList: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.winnersList != prevState.winnersList) {
            this.setState({
                winnersList: this.props.winnersList
            })
        }
    }
    /**
    * Method that returns the item component for options list
    * 
    * @param {*} param0 
    */
    _renderItemComponent = ({ item, index }) => {
        return (
            <View
                style={Styles.winnerCardStyle}>
                <ImageBackground
                    source={require('../../assets/images/confetti.png')}
                    style={Styles.imageBackground}>
                    <View
                        style={Styles.winnersSubRootBorder}>
                        <Image
                            style={Styles.profileImage}
                            source={{ uri: item.imgUrl }} />
                        <Text
                            style={[Styles.winnersTextStyle]}>
                            {item.name}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    onCloseWinnersList() {
        this.props.onCloseWinnersList();
    }

    render() {
        const { isVisible } = this.props
        console.log("Winners List in Comp: ", this.state.winnersList)
        return (
            <Modal
                visible={isVisible}
                onTouchOutside={() => { }}
                width={0.9}
                overlayOpacity={0.1}
                modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                modalStyle={{ backgroundColor: Colors.WHITE_QUIZ_TRANSPARENT }}>
                <ModalContent>
                    <View style={Styles.root}>
                        <Pressable
                            style={Styles.subRoot}
                            onPress={this.onCloseWinnersList.bind(this)}>
                            <Image
                                source={require('../../assets/images/close.png')}
                                style={Styles.imageStyle} />
                        </Pressable>
                        <Text
                            style={[Styles.titleStyle]}>
                            {'Congratulations\nWinner'}
                        </Text>
                        <FlatList
                            data={this.state.winnersList}
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
        padding: Dimens.dimen_8
    },
    subRoot: {
        alignItems: 'flex-end'
    },
    profileImage: {
        width: Dimens.dimen_42,
        height: Dimens.dimen_42,
        borderRadius: Dimens.dimen_21
    },
    titleStyle: {
        fontSize: Dimens.font_24,
        color: Colors.POLL_TEXT_COLOR,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "SFUIText-Regular",
        fontWeight: "500"
    },
    flatlistStyle: {
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_4,
    },
    listContainerStyle: {
        width: '100%'
    },
    winnerCardStyle: {
        backgroundColor: Colors.WHITE,
        borderRadius: Dimens.dimen_4,
        margin: Dimens.dimen_8,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    winnersTextStyle: {
        fontSize: Dimens.font_20,
        color: Colors.POLL_TEXT_COLOR,
        marginHorizontal: Dimens.dimen_8,
        fontFamily: "SFUIText-Regular",
        fontWeight: "500"
    },
    winnersSubRootBorder: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: Dimens.dimen_8,
        // margin: Dimens.dimen_4,
        borderColor: Colors.APP_BLUE,
        borderWidth: Dimens.dimen_2,
        borderRadius: Dimens.dimen_4,
        flexDirection: 'row'
    },
    imageStyle: {
        padding: Dimens.dimen_4
    },
    imageBackground: {
        flex: 1,
        margin: Dimens.dimen_4
    },
})
export default WinnersComp;