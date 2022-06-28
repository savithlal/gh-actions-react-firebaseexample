import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { Fonts } from '../../Styles/Font'
import { Theme } from '../../Styles/Theme'

/**
 * TextBoxWithLabel(): Returns the text box with label and clear buoon
 * @param {*} label - Label text
 * @param {*} value - Text to display inside text box
 * @param {*} showClearButton - Shows / Hide clear button
 * @param {*} onClear - Action to be performed on pressing clear button
 * @returns 
 * @author Vivek PS
 */
const TextBoxWithLabel = ({ label, value, showClearButton, onClear }) => {
    return (
        <View style={StyleSheet.container}>
            {label ?
                <Text style={styles.label}>{label}</Text>
                : null
            }
            <View style={styles.textView}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text numberOfLines={1} style={styles.inputText}>{value || 'Select location'}</Text>
                </ScrollView>
                {showClearButton ?
                    <TouchableOpacity style={styles.closeButton} onPress={onClear}>
                        <Icon name='close-sharp'
                            color={Theme.ERROR_RED}
                            size={20}
                            style={styles.closeIcon}
                        />
                    </TouchableOpacity>
                    : null}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow'
    },
    label: {
        fontFamily: Fonts.Regular,
        color: Theme.DARK_GREY,
    },
    textView: {
        marginVertical: 5,
        height: 45,
        borderWidth: 1,
        borderColor: Theme.GREY,
        borderRadius: 3,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    inputText: {
        fontFamily: Fonts.Regular,
        fontSize: 16,
        color: Theme.BLACK,
    },
    closeButton: {
        backgroundColor: Theme.BUTTON_BACKGROUND_FAINT,
        borderRadius: 20,
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    closeIcon: {
        left: 1,
    },
})
export default TextBoxWithLabel