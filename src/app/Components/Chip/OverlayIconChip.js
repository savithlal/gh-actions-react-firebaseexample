import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
const OverlayIconChip = ({value, onItemClick, customStyle, iconName}) => {
  return (
    <TouchableOpacity
      onPress={onItemClick}
      style={{
        ...styles.badge,
        ...customStyle,
      }}>
      <View style={styles.iconRound}>
        <IonIcon
          name={iconName}
          size={17}
          color={Theme.BLACK}
          style={styles.icon}
        />
      </View>

      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  text: {
    fontFamily: Fonts.Regular,
    marginLeft: 10,
    fontSize: 14,
    color: Theme.BLACK,
  },
  icon: {},
  iconRound: {
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.LIGHT_GREY,
    borderRadius: 28,
  },
});
export default OverlayIconChip;
