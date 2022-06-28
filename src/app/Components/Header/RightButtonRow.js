import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

Icon.loadFont();

const RightButtonRow = () => {
  return (
    <View style={styles.rightButtonRow}>
      <Icon name="mic" size={22} color="white" onPress={()=>{}} style={styles.iconStyle} />
      <Icon name="expand_circle_down" size={22} color="white" onPressIn={()=>{}} style={styles.iconStyle} />
    </View>
  )
}

const styles = StyleSheet.create({
    rightButtonRow:{
        flexDirection:'row',
        position:'absolute',
        right:0,
        paddingRight:10,
    },
    iconStyle: {
        paddingLeft: 10,
    },
})
export default RightButtonRow