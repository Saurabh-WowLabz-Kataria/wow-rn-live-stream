import React from 'react';
import {
    View,
    Text,
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
function ButtonComp({ label, onPress, style, buttonStyle }) {

    return (
        <View
            style={[Styles.root, style]}>
            <Pressable
                onPress={onPress}
                style={[Styles.btnStyle, buttonStyle]}
                android_ripple={{ color: Colors.DARK_BACKGROUND }}>
                <Text
                    style={Styles.label}>
                    {label}
                </Text>
            </Pressable>

        </View>
    )
}

const Styles = StyleSheet.create({
    root: {
        // flexDirection: 'row',
        // alignSelf: 'baseline'
    },
    btnStyle: {
        backgroundColor: Colors.BUTTON_BACKGROUND,
        borderRadius: Dimens.dimen_4,
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_8
    },
    label: {
        fontSize: Dimens.font_12,
        color: Colors.WHITE,
        fontFamily: "SFUIText-Regular",
        fontWeight: "700"
    }
})
export default ButtonComp;