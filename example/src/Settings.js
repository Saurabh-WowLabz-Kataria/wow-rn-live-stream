import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Switch,
    Platform,
    PermissionsAndroid
} from "react-native";
import { HOST, ATTENDEE, SettingsComponent, PREMIUM, NORMAL } from 'react-native-wow-rn-live-stream';
import Colors from '../../src/utils/Colors';
import { CO_HOST } from '../../src/utils/Constants';
import Dimens from '../../src/utils/Dimens';


class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPoll: false
        }
    }

    onStartCall(isChatEnable, selectedReactionsArr) {
        this.checkPermission(isChatEnable, selectedReactionsArr, HOST);
    }

    checkPermission(isChatEnable, selectedReactionsArr, user) {
        if (Platform.OS === 'android') {
            PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
            ).then((result) => {
                if (result['android.permission.RECORD_AUDIO']
                    && result['android.permission.CAMERA'] === 'granted') {
                    this.props.navigation.navigate('VideoCall', {
                        url: 'https://meet.jit.si/somechanellWowishh',
                        user: user,
                        userName: 'Sample User',
                        email: 'example@email.com',
                        userImageUrl: 'https://picsum.photos/100',
                        chatEnable: isChatEnable,
                        reactionsArr: selectedReactionsArr,
                        isPoll: this.state.isPoll
                    });
                } else if (result['android.permission.RECORD_AUDIO']
                    || result['android.permission.CAMERA'] === 'never_ask_again') {
                    this.refs.toast.show('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
                }
            });
        }
    }

    onEndCall() {
        this.checkPermission(true, [], CO_HOST);

        // this.props.navigation.goBack();
        // this.props.navigation.navigate('VideoCall', {
        //     url: 'https://meet.jit.si/somechanellWowishh',
        //     user: CO_HOST,
        //     userName: 'Sample User',
        //     email: 'example@email.com',
        //     userImageUrl: 'https://picsum.photos/100',
        //     chatEnable: true,
        //     reactionsArr: [],
        //     isPoll: this.state.isPoll
        // });
    }

    toggleReactions = () => {
        this.setState({
            isPoll: !this.state.isPoll
        })
    }

    render() {
        const { isPoll } = this.state
        return (
            <View style={Styles.root}>
                <SettingsComponent
                    onStartCall={this.onStartCall.bind(this)}
                    onEndCall={this.onEndCall.bind(this)} />

                {/* <Switch
                    style={{
                        position: 'absolute',
                        left: 200,
                        bottom: 200,
                        width: Dimens.dimen_24,
                        height: Dimens.dimen_24
                    }}
                    trackColor={{ false: Colors.THUMB_BACKGROUND, true: Colors.THUMB_BACKGROUND }}
                    thumbColor={isPoll ? Colors.THUMB_APP_BLUE : Colors.THUMB_COLOR_DISABLED}
                    ios_backgroundColor={Colors.THUMB_BACKGROUND}
                    onValueChange={this.toggleReactions}
                    value={isPoll} /> */}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default (Setting)