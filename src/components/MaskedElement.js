import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../utils/Colors'
import Dimens from '../utils/Dimens'

/**
 * Functional component that returns a transparent linear gradient 
 * for masking live chat view
 * 
 */
export default (props) =>
    <View style={{ backgroundColor: 'transparent', flex: 1, }}>
        <LinearGradient
            colors={[Colors.TRANSPARENT, Colors.WHITE]}
            style={styles.linearGradient}>
        </LinearGradient>
    </View>

var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        width: '100%',
        borderRadius: Dimens.dimen_6
    }
});