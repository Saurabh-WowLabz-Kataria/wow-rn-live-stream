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
            ],
            winnersList: [],
            resultForQues: {}
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

    getResultForQues(ques) {
        let aQues = {}
        aQues.correctAns = ques.correctAns
        aQues.options = ques.options
        aQues.title = ques.title
        aQues.answered = true
        this.setState({
            resultForQues: aQues
        })
    }

    getFinalResults() {
        this.setState({
            winnersList: [
                {
                    imgUrl: "https://i.picsum.photos/id/796/200/200.jpg?hmac=TabKFVb5_IyNIu3LHpgEW6YnI0AxHo3G6fyHubk1OY8",
                    name: "Saurabh Kataria"
                },
                {
                    imgUrl: "https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
                    name: "Amit Tandon"
                },
                {
                    imgUrl: "https://i.picsum.photos/id/777/200/300.jpg?grayscale&hmac=MW3suAB5fTnZAza_Ye4364HuNDxQrcrBosftHnhxfug",
                    name: "Ghost Rider"
                },
                {
                    imgUrl: "https://i.picsum.photos/id/780/200/300.jpg?blur=5&hmac=OFNZbP6X3yU1IcqmMqucFI4J2N_3dBPHfVMu-gAyP-Y",
                    name: "Bruce Wayne"
                },
                {
                    imgUrl: "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
                    name: "SRK"
                }]
        })
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
                    reAttempts={this.props.route.params.reAttempts}
                    initialTimeLimit={this.props.route.params.initialTimeLimit}
                    getResultForQues={this.getResultForQues.bind(this)}                      // Callback used in polls to get the result of a particular ques
                    resultForQues={this.state.resultForQues}
                    getFinalResults={this.getFinalResults.bind(this)}
                    winnersList={this.state.winnersList}                             // Send the result to the SDK
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