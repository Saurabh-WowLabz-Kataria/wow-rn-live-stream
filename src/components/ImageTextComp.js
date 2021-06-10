import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

function ImageTextComp({ value, style }) {

    return (
        <View
            style={[Styles.root, style]}>
            <Image
                style={Styles.imageBackground}
                source={require('../../assets/images/close.png')} />
            <Text
                style={Styles.label}>
                {value}
            </Text>

        </View>
    )
}

const Styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        marginHorizontal: Dimens.dimen_16,
        marginVertical: Dimens.dimen_12
    },
    label: {
        fontSize: Dimens.font_12,
        color: Colors.WHITE,
        marginTop: Dimens.dimen_4
    },
    imageBackground: {
        backgroundColor: Colors.WHITE,
        width: Dimens.dimen_28,
        height: Dimens.dimen_28,
        borderRadius: Dimens.dimen_14,
    }
})
export default ImageTextComp;