import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
//This section used for title
//Author Charles
const TitleToggle = ({name, customStyle, open = true, onClickActivity}) => {
  return (
    <TouchableOpacity
      style={{...styles.itemView, ...customStyle}}
      onPress={onClickActivity}>
      <Text style={styles.flatListItemName}>{name}</Text>
      {open ? (
        <Ionicons
          name="chevron-up"
          size={28}
          color={Theme.GREY}
          style={styles.iconStyle}
        />
      ) : (
        <Ionicons
          name="chevron-down"
          size={28}
          color={Theme.GREY}
          style={styles.iconStyle}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  flatListItemName: {
    fontSize: 22,
    fontFamily: Fonts.Regular,
    color: Theme.BLACK,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default TitleToggle;
