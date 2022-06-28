import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Fonts } from '../../Styles/Font';
import { Theme } from '../../Styles/Theme';
import { TextDisplayModal } from '../Modals/TextDisplayModal';

/**
 * LabelBox(): Retuns the label box for label list
 * @param {*} name - Label name
 * @param {*} id - Lable ID
 * @param {*} isSelected - If label is selected or not
 * @param {*} onItemClick - Action to be performed on clicking label box
 * @param {*} customStyle - Additional styles if needed
 * @returns 
 */
const LabelBox = ({ name, id, isSelected = false, onItemClick, customStyle }) => {
    const [isModalVisible, setModalVisibility] = useState(false)
    return (
        <TouchableOpacity
            onPress={() => onItemClick(id)}
            onLongPress={() => { setModalVisibility(true) }}
            style={[styles.inactiveContainer, isSelected ? styles.activeContainer : null, customStyle]}>
            <Text numberOfLines={1} style={styles.label}>{name}</Text>
            <TextDisplayModal
                text={name}
                isVisible={isModalVisible}
                onClose={() => setModalVisibility(false)}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    inactiveContainer: {
        borderWidth: 1,
        borderColor: Theme.SECONDARY_BLUE,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3
    },
    activeContainer: {
        backgroundColor: Theme.LIGHT_BLUE
    },
    label: {
        fontFamily: Fonts.SemiBold,
        color: Theme.SECONDARY_BLUE,
        fontSize: 12,
        maxWidth: 80,
    },
});

export default LabelBox;