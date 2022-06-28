import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
//this is button for adding someting in bottom of the page
//Author Charles
const AddButton = ({name, onItemClick, customStyle, textStyle}) => {
  return (
    <TouchableOpacity
      style={{...styles.itemView, ...customStyle}}
      onPress={() => onItemClick()}>
      <Text style={{...styles.flatListItemName, ...textStyle}}>{name}</Text>
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
    fontFamily: Fonts.Bold,
    color: Theme.SECONDARY_BLUE,
    marginVertical: 17,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default AddButton;
