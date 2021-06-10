import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Pressable
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

/**
 * Stateless component for all the buttons
 * 
 * @param {*} param0 
 */
function ToolbarComp({ onCancelCall, onFlashOff, onFlashOn, onSwitchCamera, style }) {

    return (
        <View
            style={[Styles.toolbarRoot, style]}>
            <Pressable
                onPress={onCancelCall}
                style={Styles.btnStyle}>
                <Image
                    style={Styles.label}
                    source={require('../../assets/images/close.png')} />
            </Pressable>

            <View
                style={Styles.subRoot}>
                {/* <Pressable
                    onPress={onFlashOff}
                    style={Styles.btnStyle}>
                    <Image
                        style={Styles.label}
                        source={require('../../assets/images/flash_off.png')} />
                </Pressable>
                <Pressable
                    onPress={onFlashOn}
                    style={Styles.btnStyle}>
                    <Image
                        style={Styles.label}
                        source={require('../../assets/images/flash.png')} />
                </Pressable> */}
                <Pressable
                    onPress={onSwitchCamera}
                    style={Styles.btnStyle}>
                    <Image
                        style={Styles.label}
                        source={require('../../assets/images/camera_switch.png')} />
                </Pressable>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    toolbarRoot: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: Dimens.dimen_56,
        paddingHorizontal: Dimens.dimen_16,
        backgroundColor: Colors.TOOLBAR_BACKGROUND
    },
    subRoot: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    btnStyle: {
        padding: Dimens.dimen_12
    },
    label: {
        width: Dimens.dimen_21,
        height: Dimens.dimen_21,
        padding: Dimens.dimen_8,
        tintColor: Colors.WHITE
    }
})
export default ToolbarComp;