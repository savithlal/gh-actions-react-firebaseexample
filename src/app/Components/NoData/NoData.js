import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';

const NoData = ({}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{'No Data Found'}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    flex: 1,
    alignContent: 'center',
  },
  text: {
    fontSize: 15,
    color: Theme.DARKEST_GREY,
    fontFamily: Fonts.SemiBold,
  },
});
export default NoData;
