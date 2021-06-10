import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { LiveStreamComp } from 'react-native-wow-rn-live-stream';
import { HOST, BASE_URL, NORMAL, QUESTIONS, ITEM_SEPERATOR } from 'react-native-wow-rn-live-stream';
import database from '@react-native-firebase/database';

class VideoCall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sampleQuestions: [
                {
                    title: 'Who played Mr.India? ',
                    options: [
                        {
                            option: 'Anil Kapoor',
                            result: 59
                        },
                        {
                            option: 'Amir Khan',
                            result: 15
                        },
                        {
                            option: 'Don Jon',
                            result: 5
                        },
                        {
                            option: 'Irfan Khan',
                            result: 21
                        }
                    ],
                    answered: false,
                    correctAns: 'Anil Kapoor'
                },
                {
                    title: 'Capital Of India',
                    options: [
                        {
                            option: 'Kolkata',
                            result: 7
                        },
                        {
                            option: 'Mumbai',
                            result: 11
                        },
                        {
                            option: 'Delhi',
                            result: 82
                        },
                    ],
                    answered: false,
                    correctAns: 'Delhi'
                },
                {
                    title: 'Fastest Men on Earth?',
                    options: [
                        {
                            option: 'Usain Bolt',
                            result: 21
                        },
                        {
                            option: 'Flash',
                            result: 27
                        },
                        {
                            option: 'Superman',
                            result: 11
                        },
                        {
                            option: 'MSD',
                            result: 41
                        }
                    ],
                    answered: false,
                    correctAns: 'Usain Bolt'
                },
                {
                    title: 'Is Leo DiCaprio best?',
                    options: [
                        {
                            option: 'Yes',
                            result: 77
                        },
                        {
                            option: 'No',
                            result: 23
                        }
                    ],
                    answered: false,
                    correctAns: 'Yes'
                }
            ]
        }
    }

    onCallEnded() {
        this.props.navigation.goBack();
    }

    onOptionSelected(value, ansTime) {
        console.log("Selected Value : ", value)
        console.log("Ans time : ", ansTime)
        // do something
    }

    render() {
        return (
            <View style={Styles.root}>
                {/* <LiveStreamComp
                    callUrl={this.props.route.params.url}
                    user={this.props.route.params.user}
                    userName={this.props.route.params.userName}
                    email={this.props.route.params.email}
                    userImageUrl={this.props.route.params.userImageUrl}
                    onCallEnded={this.onCallEnded.bind(this)}
                    questionsList={this.state.sampleQuestions}
                    onOptionSelected={this.onOptionSelected.bind(this)} /> */}

                <LiveStreamComp
                    callUrl={this.props.route.params.url}
                    user={this.props.route.params.user}
                    userName={this.props.route.params.userName}
                    email={this.props.route.params.email}
                    userImageUrl={this.props.route.params.userImageUrl}
                    onCallEnded={this.onCallEnded.bind(this)}
                    questionsList={this.state.sampleQuestions}
                    onOptionSelected={this.onOptionSelected.bind(this)}
                    videoMode={NORMAL}
                    token={'00654378363c5f74b4e997dab4e384a32e5IABr3pRYedpFmoLtGUW4ZYURXR/WbX+AjlzyTeWLsHVODc7QEgUAAAAAEAD7cHwez7W4YAEAAQDPtbhg'}
                    chatEnable={this.props.route.params.chatEnable}
                    reactionsArr={this.props.route.params.reactionsArr}
                    isPoll={this.props.route.params.isPoll}
                />

            </View>
        )
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato'
    },
    text: {
        fontSize: 14,
        color: "#000000",
        margin: 24,
        textAlign: 'center'
    },
})

export default (VideoCall)