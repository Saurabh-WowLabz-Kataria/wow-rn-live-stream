import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from "react-native";
import { LiveStreamComp } from 'react-native-wow-rn-live-stream';
import { HOST, BASE_URL, QUESTIONS, ITEM_SEPERATOR } from 'react-native-wow-rn-live-stream';
import database from '@react-native-firebase/database';

class VideoCall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sampleQuestions: [
                {
                    title: 'First Question',
                    options: [
                        'First Options',
                        'Second Options',
                        'Third Option',
                        'Fourth Option'
                    ]
                },
                {
                    title: 'Second Question',
                    options: [
                        'First Options',
                        'Second Options',
                        'Third Option']
                },
                {
                    title: 'Third Question',
                    options: [
                        'First Options',
                        'Second Options',
                        'Third Option',
                        'Fourth Option'
                    ]
                },
                {
                    title: 'Fourth Question',
                    options: [
                        'First Options',
                        'Second Options'
                    ]
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
                <LiveStreamComp
                    callUrl={this.props.route.params.url}
                    user={this.props.route.params.user}
                    userName={this.props.route.params.userName}
                    email={this.props.route.params.email}
                    userImageUrl={this.props.route.params.userImageUrl}
                    onCallEnded={this.onCallEnded.bind(this)}
                    questionsList={this.state.sampleQuestions}
                    onOptionSelected={this.onOptionSelected.bind(this)} />

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