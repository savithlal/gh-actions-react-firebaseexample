import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from '../../../Styles/Font';
import { Theme } from '../../../Styles/Theme';

/**
 * CustomHeader(): Returns custom header for use in location selection screen
 * @param {*} heading - Heading Text
 * @param {*} description - Description Text
 * @returns 
 */
const CustomHeader = ({ heading, description }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerSection}>
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                <Icon
                    name="arrow-back"
                    size={20}
                    color={Theme.PRIMARY_GREY}
                    style={styles.iconStyle}
                />
            </TouchableOpacity>
            <Text style={styles.heading}>{heading}</Text>
            {description ?
                <Text style={styles.description}>{description}</Text>
                : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    headerSection: {
        marginBottom: 25
    },
    backButton:{
        width:30,
    },
    iconStyle: {
        marginLeft: -5
    },
    heading: {
        fontFamily: Fonts.SemiBold,
        fontSize: 24,
        color: Theme.BLACK,
        marginTop: 25
    },
    description: {
        fontFamily: Fonts.Regular,
        fontSize: 16,
        color: Theme.DARKEST_GREY,
        marginTop: 5
    },
})
export default CustomHeader