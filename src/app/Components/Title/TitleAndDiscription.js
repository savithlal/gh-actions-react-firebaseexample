import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
//This section used for title
//Author Charles
const TitleAndDiscription = ({name, customStyle, discription}) => {
  return (
    <View style={{...styles.itemView, ...customStyle}}>
      <Text style={styles.flatListItemName}>{name}</Text>
      <Text style={styles.discription}>{discription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
  },

  flatListItemName: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: Theme.GREY,
    textTransform: 'uppercase',
  },
  discription: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Theme.BLACK,
    marginTop: 5,
  },
});

export default TitleAndDiscription;
