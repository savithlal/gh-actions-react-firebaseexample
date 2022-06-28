import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Theme} from '../../Styles/Theme';

const Divider = ({customStyle}) => {
  return <View style={{...styles.divider, ...customStyle}} />;
};
const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Theme.LIGHT_GREY,
    marginVertical: 15,
  },
});
export default Divider;
