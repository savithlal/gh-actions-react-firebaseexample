import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Row from '../../../Components/Row'
import { Fonts } from '../../../Styles/Font'
import { Theme } from '../../../Styles/Theme'

const WelcomeMessage = ({ name, containerStyle, iconViewStyle, iconTextStyle, textStyle }) => {
    return (
        <Row rowStyle={[styles.container, containerStyle]}>
            <View style={[styles.iconView, iconViewStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>{name?.charAt(0) || 'u'}</Text>
            </View>
            <Text style={[styles.messageText, textStyle]}>Welcome, {name || 'user'}!</Text>
        </Row>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    iconView: {
        height: 35,
        width: 35,
        backgroundColor: Theme.LIGHT_TEXT,
        borderRadius: 20,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconText: {
        fontFamily: Fonts.SemiBold,
        fontSize: 22,
        lineHeight: 32,
        color: Theme.White,
        textTransform: 'capitalize',
    },
    messageText: {
        fontFamily: Fonts.Bold,
        fontSize: 24,
        lineHeight: 32,
        color: Theme.PRIMARY_GREY,
        textTransform: 'capitalize',
        marginRight: 15,
        maxWidth: '80%'
    },
})
export default WelcomeMessage