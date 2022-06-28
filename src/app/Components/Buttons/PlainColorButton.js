import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Theme } from '../../Styles/Theme';
import { Fonts } from '../../Styles/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';

//this is button for adding someting in bottom of the page
//Author Charles
const PlainColorButton = ({
  name,
  onItemClick,
  customStyle,
  textStyle,
  icon = false,
  iconName = 'call',
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.itemView, ...customStyle }}
      onPress={() => (loading ? null : onItemClick())}>
      <View style={styles.row}>
        {icon ? (
          <Ionicons
            name={iconName}
            size={20}
            color={Theme.White}
            style={styles.iconStyle}
          />
        ) : null}
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={[styles.flatListItemName, textStyle]}>{name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    borderColor: Theme.SECONDARY_BLUE,
    backgroundColor: Theme.SECONDARY_BLUE,
    borderWidth: 1,
    margin: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListItemName: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: Theme.White,
    // margin: 17,
    textTransform: 'uppercase',
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

export default PlainColorButton;
