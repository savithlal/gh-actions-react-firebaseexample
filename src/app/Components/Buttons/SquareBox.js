import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../styles/theme';
import {Fonts} from '../../styles/font';
//this is button for adding someting in bottom of the page
//Author Charles
const SquareBox = ({name, onItemClick, customStyle}) => {
  return (
    <TouchableOpacity
      style={{...styles.itemView, ...customStyle}}
      onPress={() => onItemClick()}>
      <Text style={styles.flatListItemName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    borderColor: Theme.SECONDARY_BLUE,
    borderWidth: 1,
    margin: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListItemName: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    color: Theme.SECONDARY_BLUE,
    margin: 17,
  },
});

export default SquareBox;
