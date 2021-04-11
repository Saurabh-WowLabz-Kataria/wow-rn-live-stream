import React from 'react';
import { StyleSheet } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

/**
 * Functional component that returns a masked view with a transparent 
 * linear gradient, add childrens to this view which you want to 
 * mask with linear fade
 * 
 */
export default ({ element, children }) =>
    <MaskedView
        style={styles.container}
        maskElement={element}>
        {children}
    </MaskedView>

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
    }
});