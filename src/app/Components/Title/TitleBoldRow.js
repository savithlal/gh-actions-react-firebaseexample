import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';

//This section used for titile with price
//Author Charles
const TitleBoldRow = ({value, price, customStyle}) => {
  return (
    <View style={{...styles.itemView, ...customStyle}}>
      <View style={{flex: 0.7}}>
        <Text style={styles.discription}>{value}</Text>
      </View>
      <View style={{flex: 0.2, alignItems: 'flex-end', marginRight: 15}}>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  discription: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: Theme.BLACK,
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: Theme.BLACK,
  },
});

export default TitleBoldRow;
