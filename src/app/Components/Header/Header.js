import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements';
import { Theme } from '../../Styles/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

const HeaderComponent = ({ title, leftButton, rightButtonRow, style }) => {
    const heading = title
    return (
        <View style={[styles.headerContainer, style]}>
            {leftButton}
            <Text style={styles.headerText}>{title}</Text>
            {rightButtonRow}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Theme.PRIMARY_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default HeaderComponent