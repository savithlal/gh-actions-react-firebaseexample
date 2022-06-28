import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Theme} from '../../Styles/Theme';

const DividerThick = ({customStyle}) => {
  return <View style={{...styles.divider, ...customStyle}} />;
};
const styles = StyleSheet.create({
  divider: {
    height: 27,
    backgroundColor: Theme.grey_4,
    // marginVertical: 15,
    borderTopColor: Theme.LIGHT_GREY,
    borderTopWidth: 1,
    borderBottomColor: Theme.LIGHT_GREY,
    borderBottomWidth: 1,
  },
});
export default DividerThick;
