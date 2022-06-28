import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Row({children, rowStyle}) {
  return <View style={[styles.wraapper, rowStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  wraapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
