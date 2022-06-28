import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../../Styles/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { Fonts } from '../../Styles/Font';
import deviceInfoModule from 'react-native-device-info';

/**
 * CustomModal(): Returns Modal / Bottom sheet container
 * @param {*} children - Child components
 * @param {*} isVisible (Boolean) - Visibility status
 * @param {*} onClose - Action to be performed on closing
 * @param {*} isBottomSheet (Boolean) - specify whether to return bottom sheet or modal
 * @param {*} customStyles - custom styles
 * @returns
 * @author Vivek PS
 */
export const CustomModal = (props) => {
    return (
        <Modal
            isVisible={props.isVisible}
            onSwipeComplete={props.onClose}
            swipeDirection={['down']}
            style={[props.isBottomSheet ? styles.bottomSheetLayout : styles.modalLayout,props.customStyles]}
            onBackdropPress={props.onClose}>
            <View style={props.isBottomSheet ? styles.bottomSheetContainer : styles.modalContainer}>
                {props.isBottomSheet ?
                    <View style={styles.drawer} /> : null
                }
                <TouchableOpacity style={styles.closeIcon} onPress={() => props.onClose()}>
                    <MaterialIcons name="close" color={Theme.GREY} size={30} />
                </TouchableOpacity>
                <View>{props.children}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalLayout: {
        width: deviceInfoModule.isTablet() ? '75%' : undefined,
        alignSelf: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingBottom: 25,
        paddingTop: 10,
        elevation: 15,
    },
    bottomSheetLayout: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        paddingBottom: 25,
        elevation: 15,
    },
    closeIcon: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 5
    },
    drawer: {
        backgroundColor: Theme.LIGHT_GREY,
        height: 4,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 8,
        borderRadius: 2,
    },
});
