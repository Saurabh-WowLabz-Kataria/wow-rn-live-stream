import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
} from "react-native";
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

/**
 * Stateless component for message item in live chat
 * 
 * @param {*} param0 
 */
function MessageComp({ imageUrl, name, msg }) {

    return (
        <View
            style={Styles.root}>
            <Image
                style={Styles.profileImage}
                source={{ uri: imageUrl }} />
            <View
                style={Styles.subRoot}>
                <Text
                    style={Styles.userName}>
                    {name}
                </Text>
                <Text
                    style={Styles.msg}>
                    {msg}
                </Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        marginHorizontal: Dimens.dimen_16,
        marginVertical: Dimens.dimen_4
    },
    subRoot: {
        marginHorizontal: Dimens.dimen_16,
        justifyContent: 'center',
    },
    profileImage: {
        width: Dimens.dimen_42,
        height: Dimens.dimen_42,
        borderRadius: Dimens.dimen_21
    },
    userName: {
        fontSize: Dimens.font_14,
        fontWeight: 'bold',
        color: Colors.WHITE
    },
    msg: {
        fontSize: Dimens.font_14,
        color: Colors.WHITE
    }
})
export default MessageComp;