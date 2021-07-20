import React, { Component } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    StyleSheet,
    FlatList,
    Dimensions
} from "react-native";
import { color } from 'react-native-reanimated';
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

const windowWidth = Dimensions.get('window').width;

/**
 * Stateless component for toggling options in stream
 * 
 * @param {*} param0 
 */

class CallCountdownComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMin: 14,
            currentSec: 59
        }
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        this.callTimerListener = setTimeout(() => {
            if (this.state.currentSec > 0) {
                this.setState({
                    currentSec: this.state.currentSec - 1
                })
                this.startTimer();
            } else if (this.state.currentMin > 0) {
                this.setState({
                    currentSec: 59,
                    currentMin: this.state.currentMin - 1
                })
                this.startTimer();
            } else {
                this.props.timeUp();
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.callTimerListener);
        this.callTimerListener = null
    }

    render() {
        const { currentMin, currentSec } = this.state
        const { style } = this.props
        let currentSecs = currentSec > 9 ? currentSec : "0" + currentSec
        return (
            <View
                style={[Styles.root, style]}>
                <Text style={Styles.liveCounter}>
                    {currentMin + ":" + currentSecs}
                </Text>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    root: {
        marginTop: Dimens.dimen_42,
        position: 'absolute',
        top: 30,
        right: 20,
    },
    liveCounter: {
        flexShrink: 1,
        fontSize: Dimens.font_12,
        color: Colors.RED,
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_4,
        borderRadius: Dimens.dimen_16,
        backgroundColor: Colors.APP_DARK_BLUE_TRANSPARENT
    }
})
export default CallCountdownComp;