import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Theme } from '../../Styles/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { Fonts } from '../../Styles/Font';
import deviceInfoModule from 'react-native-device-info';

/**
 * TextDisplayModal(): Returns Modal with text inside
 * @param {*} text - Text to display
 * @param {*} isVisible (Boolean) - Visibility status
 * @param {*} onClose - Action to be performed on closing
 * @returns
 * @author Vivek PS
 */
export const TextDisplayModal = ({ text, isVisible, onClose }) => {
    return (
        <Modal
            isVisible={isVisible}
            onSwipeComplete={onClose}
            swipeDirection={['down']}
            style={[styles.modalLayout]}
            onBackdropPress={onClose}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                    <MaterialIcons name="close" color={Theme.GREY} size={30} />
                </TouchableOpacity>
                <View style={styles.popupTextContainer}>
                    <Text style={styles.popupText}>{text}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalLayout: {
        width: deviceInfoModule.isTablet() ? '75%' : '80%',
        alignSelf: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingBottom: 25,
        elevation: 15,
    },
    closeIcon: {
        alignSelf: 'flex-end',
        marginRight: 5,
        marginTop: 5
    },
    popupModal: {
        height: 60,
        width: '80%',
    },
    popupTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    popupText: {
        fontFamily: Fonts.SemiBold,
        color: Theme.SECONDARY_BLUE,
        fontSize: 18,
    },
});