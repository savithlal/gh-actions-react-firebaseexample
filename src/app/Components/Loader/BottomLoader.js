import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Fonts} from '../../Styles/Font';
import {Theme} from '../../Styles/Theme';

const BottomLoader = ({}) => {
  return (
    <View style={styles.row}>
      <ActivityIndicator
        size="small"
        color={Theme.BLACK}
        style={{padding: 10}}
      />
      <Text style={styles.text}>{'Please Wait...'}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    color: Theme.DARKEST_GREY,
    fontFamily: Fonts.SemiBold,
  },
});
export default BottomLoader;
