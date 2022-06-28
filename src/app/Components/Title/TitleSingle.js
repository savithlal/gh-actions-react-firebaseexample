import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
//This section used for title
//Author Charles
const TitleSingle = ({name, customStyle}) => {
  return (
    <View style={{...styles.itemView, ...customStyle}}>
      <Text style={styles.flatListItemName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },

  flatListItemName: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: Theme.GREY,
    textTransform: 'uppercase',
  },
});

export default TitleSingle;
