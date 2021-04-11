import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from "react-native";
import { LiveStreamComp } from 'react-native-wow-rn-live-stream';

class VideoCall extends Component {

    constructor(props) {
        super(props);

    }

    onCallEnded() {
        this.props.navigation.goBack();
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
                    onCallEnded={this.onCallEnded.bind(this)} />
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