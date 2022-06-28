import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
//checkbox with name
//Author Charles
const CheckBox = ({name, id, checked = false, onItemClick, customStyle}) => {
  return (
    <TouchableOpacity
      onPress={() => onItemClick(id)}
      style={{...styles.container, ...customStyle}}>
      {checked ? (
        <Ionicons
          name="checkbox"
          color={Theme.SECONDARY_BLUE}
          size={24}
          style={styles.icon}
        />
      ) : (
        <Ionicons
          name="square-outline"
          color={Theme.GREY}
          size={24}
          style={styles.icon}
        />
      )}
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color: Theme.BLACK,
    marginLeft: 16,
  },
  icon: {},
});

export default CheckBox;
