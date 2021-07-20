import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    Text,
    Pressable,
    ImageBackground
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'
import { Modalize } from 'react-native-modalize';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class PollList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quesList: [],
        }
        this.modalizeRef = React.createRef();
    }

    onAskQues(value) {
        this.props.askQues(value)
        this.modalizeRef.current.close('alwaysOpen');

    }

    /**
    * Method that returns the message item component for chat list
    * 
    * @param {*} param0 
    */
    _renderItemComponent = ({ item, index }) => {
        const opaqueText = item.answered ? Styles.answeredText : null
        return (
            <Pressable
                onPress={this.onAskQues.bind(this, index)}
                style={Styles.rootCardStyle}>
                <Text
                    style={[Styles.questionIndexStyle, opaqueText]}>
                    Question {index + 1}/{this.state.quesList.length}
                </Text>
                <Text
                    style={[Styles.questionTitleStyle, opaqueText]}>
                    {item.title}
                </Text>
            </Pressable>
        )
    }

    componentDidMount() {
        this.setState({
            quesList: this.props.quesList
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.quesList !== this.props.quesList) {
            this.setState({
                quesList: this.props.quesList
            })
        }
    }

    onShowResult() {
        this.props.showResult();
        this.modalizeRef.current.close('alwaysOpen');
    }

    footer = () => {
        return (
            <Pressable
                onPress={this.onShowResult.bind(this)}
                style={Styles.winnerCardStyle}>
                <ImageBackground
                    source={require('../../assets/images/confetti.png')}
                    style={Styles.imageBackground}>
                    <View
                        style={Styles.winnersSubRootBorder}>

                        <Text
                            style={[Styles.winnersTextStyle]}>
                            {'Announce\nWinners'}
                        </Text>
                    </View>
                </ImageBackground>
            </Pressable>
        );
    };

    render() {
        const { quesList } = this.state
        return (
            <Modalize
                ref={this.modalizeRef}
                alwaysOpen={12}
                modalHeight={windowHeight * 0.2}
                withOverlay={false}>
                <View style={Styles.contentStyle}>
                    <FlatList
                        data={quesList}
                        extraData={this.state}
                        renderItem={this._renderItemComponent}
                        style={Styles.flatlistStyle}
                        horizontal={true}
                        contentContainerStyle={Styles.listContainerStyle}
                        ListFooterComponent={this.footer} />
                </View>
            </Modalize>
        );
    }
}

const Styles = StyleSheet.create({
    flatlistStyle: {
        flexGrow: 0,
        marginTop: Dimens.dimen_16,
        marginBottom: Dimens.dimen_4,
        paddingStart: Dimens.dimen_12,
        alignSelf: 'flex-end',
    },
    rootCardStyle: {
        backgroundColor: Colors.WHITE,
        padding: Dimens.dimen_14,
        borderRadius: Dimens.dimen_4,
        margin: Dimens.dimen_8,
        width: windowWidth * 0.4,
        height: windowHeight * 0.15
    },
    listContainerStyle: {
        flex: 0
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'row',
        height: windowHeight * 0.2,
        paddingBottom: Dimens.dimen_12,
    },
    winnerCardStyle: {
        backgroundColor: Colors.WHITE,
        borderRadius: Dimens.dimen_4,
        margin: Dimens.dimen_8,
        marginEnd: Dimens.dimen_16,
        // alignItems: 'center',
        // justifyContent: 'center',
        width: windowWidth * 0.4,
        height: windowHeight * 0.15
    },
    imageBackground: {
        flex: 1,
        margin: Dimens.dimen_4
    },
    winnersTextStyle: {
        // flex: 1,
        fontSize: Dimens.font_16,
        color: Colors.POLL_TEXT_COLOR,
        textAlign: 'center',
        fontFamily: "SFUIText-Regular",
        fontWeight: "600"
    },
    winnersSubRootBorder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Dimens.dimen_8,
        // margin: Dimens.dimen_4,
        borderColor: Colors.APP_BLUE,
        borderWidth: Dimens.dimen_2,
        borderRadius: Dimens.dimen_4
    },
    questionIndexStyle: {
        fontSize: Dimens.font_14,
        color: Colors.POLL_TEXT_COLOR,
        fontFamily: "SFUIText-Regular",
        fontWeight: "600"
    },
    questionTitleStyle: {
        fontSize: Dimens.font_11,
        color: Colors.POLL_TEXT_COLOR,
        marginTop: Dimens.dimen_8,
        fontFamily: "SFUIText-Regular",
        fontWeight: "500"
    },
    answeredText: {
        opacity: 0.6
    }

})
export default PollList;