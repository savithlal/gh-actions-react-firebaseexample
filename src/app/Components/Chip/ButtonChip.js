import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
const ButtonChip = ({
  type,
  id,
  value,
  checked = false,
  onItemClick,
  customStyle,
  key,
}) => {
  return (
    <TouchableOpacity
      key={id}
      onPress={() => onItemClick(id)}
      style={{
        ...styles.badge,
      }}>
      {checked ? (
        <IonIcon
          name="checkmark"
          size={18}
          color={Theme.BLACK}
          style={styles.icon}
        />
      ) : null}
      <Text
        style={{
          ...styles.text,
          color: checked ? Theme.BLACK : Theme.grey_2,
        }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  badge: {
    height: 32,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    //  marginTop: 15,
    margin: 5,
    backgroundColor: Theme.LIGHT_GREY,
    borderRadius: 16,
  },
  text: {
    fontFamily: Fonts.Regular,
    marginRight: 5,
    fontSize: 13,
  },
  icon: {
    marginRight: 5,
  },
});
export default ButtonChip;
