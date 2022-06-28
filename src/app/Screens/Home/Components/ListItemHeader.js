import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import WelcomeMessage from './WelcomeMessage'
import WeatherWidget from './WeatherWidget'
import { Theme } from '../../../Styles/Theme'
import { Fonts } from '../../../Styles/Font'

const ListItemHeader = ({ userName, showHeading }) => {
    return (
        <View>
            <WelcomeMessage name={userName} containerStyle={styles.WelcomeMessage} />
            <WeatherWidget />
            {showHeading ?
                <Text style={styles.listHeading}>Today’s inspections</Text>
                : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    WelcomeMessage: {
        marginTop: 15,
    },
    listHeading: {
        marginLeft: 18,
        marginTop: 10,
        fontFamily: Fonts.Bold,
        textTransform: 'uppercase',
        color: Theme.GREY,
        fontSize: 12,
    },
})

export default ListItemHeader