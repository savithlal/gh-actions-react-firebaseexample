import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
//this is button for adding someting in bottom of the page
//Author Charles
const HyperLinkButton = ({
  value,
  onItemClick,
  customStyle,
  icon = false,
  iconName = 'call',
}) => {
  return (
    <TouchableOpacity
      style={{...styles.itemView, ...customStyle}}
      onPress={() => onItemClick()}>
      <View style={styles.row}>
        {icon ? (
          <Ionicons
            name={iconName}
            size={20}
            color={Theme.White}
            style={styles.iconStyle}
          />
        ) : null}
        <Text style={styles.flatListItemName}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListItemName: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
    color: Theme.SECONDARY_BLUE,
    textDecorationLine: 'underline',
    // margin: 17,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 17,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default HyperLinkButton;
