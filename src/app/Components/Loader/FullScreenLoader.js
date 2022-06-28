import React from 'react'
import { View, ActivityIndicator } from 'react-native'

/**
 * FullScreenLoader(): Returns a full screen activity indicator
 * @param {*} color 
 * @returns 
 * @author Vivek PS
 */
const FullScreenLoader = ({ color }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={color} size="large" />
        </View>
    )
}

export default FullScreenLoader