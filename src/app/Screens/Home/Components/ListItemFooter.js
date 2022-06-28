import { View, StyleSheet } from 'react-native'
import React from 'react'
import PlainColorButton from '../../../Components/Buttons/PlainColorButton'
import AddButton from '../../../Components/Buttons/AddButton'
import { Theme } from '../../../Styles/Theme'
import deviceInfoModule from 'react-native-device-info'

const ListItemFooter = () => {
    return (
        <View style={styles.container}>
            <PlainColorButton
                name='New order'
                customStyle={styles.button}
                textStyle={styles.buttonText}
            />
            <AddButton
                name='help'
                customStyle={styles.button}
                textStyle={styles.buttonText}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: Theme.LIGHT_GREY,
        paddingVertical: 10,
        ...deviceInfoModule.isTablet() ?
            {
                flexDirection: 'row',
                justifyContent: 'space-around'
            } : {

            }
    },
    button: {
        marginVertical: 10,
        height: 50,
        ...deviceInfoModule.isTablet() ?
            {
                flex: 1,
            } : {

            }
    },
    buttonText: {
        textTransform: 'uppercase'
    },
})

export default ListItemFooter