import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';

const LineItemFlagChip = ({type, value, customStyle}) => {
  return (
    <View
      style={{
        ...styles.badge,
        ...customStyle,
      }}>
      <View style={styles.iconView}>
        {type ? (
          <IonIcon
            name="flag"
            size={12}
            color={Theme.White}
            style={styles.icon}
          />
        ) : (
          <IonIcon
            name="close-circle-sharp"
            size={18}
            color={Theme.ERROR_RED}
            style={styles.icon}
          />
        )}
      </View>

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
    fontSize: 16,
    marginLeft: 7,
  },
  iconView: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: Theme.ERROR_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LineItemFlagChip;
