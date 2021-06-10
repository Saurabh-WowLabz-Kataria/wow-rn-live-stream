import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

/**
 * Stateless component for live counter in stream
 * 
 * @param {*} param0 
 */
function LiveCounterComp({ totalCount, style }) {

    return (
        <View
            style={[Styles.root, style]}>
            <Text
                style={Styles.liveCounter}>
                {totalCount} Live
                </Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
    },
    liveCounter: {
        flexShrink: 1,
        fontSize: Dimens.font_12,
        color: Colors.WHITE,
        paddingHorizontal: Dimens.dimen_16,
        paddingVertical: Dimens.dimen_4,
        borderRadius: Dimens.dimen_16,
        backgroundColor: Colors.APP_BLUE
    }
})
export default LiveCounterComp;