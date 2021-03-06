import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { HOST, ATTENDEE, setBaseUrl } from 'react-native-wow-rn-live-stream';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setBaseUrl("https://jitsi.starbeat.com/");
    }

    onStartVideoConferrencing() {
        // this.props.navigation.navigate('VideoCall', {
        //     url: 'https://meet.jit.si/somechanellWowishh',
        //     user: HOST,
        //     userName: 'Sample User',
        //     email: 'example@email.com',
        //     userImageUrl: 'https://picsum.photos/100'
        // });
        this.props.navigation.navigate('Settings');
    }

    onJoinVideoConferrencing() {
        // this.props.navigation.navigate('VideoCall', {
        //     url: 'https://jitsi.starbeat.com/somechanellWowishh',
        //     user: ATTENDEE,
        //     userName: 'Sample User',
        //     email: 'example@email.com',
        //     userImageUrl: 'https://picsum.photos/100'
        // });
        this.props.navigation.navigate('ActiveSessions');
    }

    render() {
        return (
            <View style={Styles.root}>
                <TouchableOpacity
                    onPress={this.onStartVideoConferrencing.bind(this)}>
                    <Text style={Styles.text}>
                        Start Video Conferrencing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.onJoinVideoConferrencing.bind(this)}>
                    <Text style={Styles.text}>
                        Join Video Conferrencing
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: "#000000",
        margin: 24,
        textAlign: 'center'
    }
})

export default (HomeScreen)