import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';

const IconChip = ({type, value, customStyle}) => {
  return (
    <View
      style={{
        ...styles.badge,
        ...customStyle,
      }}>
      {type ? (
        <IonIcon
          name="checkmark-circle"
          size={18}
          color={Theme.SECONDARY_BLUE}
          style={styles.icon}
        />
      ) : (
        <IonIcon
          name="close-circle-sharp"
          size={18}
          color={Theme.ERROR_RED}
          onPress={() => {}}
          style={styles.icon}
        />
      )}
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  badge: {
    height: 27,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 15,
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts.Regular,
    color: Theme.BLACK,
    fontSize: 14,
    marginLeft: 7,
  },
});
export default IconChip;
