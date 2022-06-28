import React from 'react'
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HamburgerButton = ({ onPress }) => {
    return (
        <Icon name="menu" size={28} color="white" onPress={onPress} style={styles.iconStyle} />
    )
}

const styles = StyleSheet.create({
    iconStyle: {
        paddingLeft: 10,
        left: 0,
        position: 'absolute',
    },
})
export default HamburgerButton