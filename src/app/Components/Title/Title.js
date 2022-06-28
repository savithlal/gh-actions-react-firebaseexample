import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
//This section used for title
//Author Charles
const Title = ({name, customStyle, customTextStyle}) => {
  return (
    <View style={{...styles.itemView, ...customStyle}}>
      <Text style={[styles.flatListItemName, customTextStyle]}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'center',
  },

  flatListItemName: {
    fontSize: 22,
    fontFamily: Fonts.SemiBold,
    color: Theme.BLACK,
  },
});

export default Title;
