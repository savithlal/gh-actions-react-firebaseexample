import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Divider from '../Divider/Divider';
//This section used for title
//Author Charles
const TitleWithArrow = ({name, customStyle, customTextStyle}) => {
  return (
    <View>
      <View style={{...styles.itemView, ...customStyle}}>
        <Text style={[styles.flatListItemName, customTextStyle]}>{name}</Text>
        <Ionicons
          name="chevron-forward"
          size={30}
          color={Theme.GREY}
          style={styles.iconStyle}
        />
      </View>
      <Divider customStyle={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 45,
    marginTop: 25,
    marginBottom: 15,
    marginRight: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flatListItemName: {
    fontSize: 20,
    fontFamily: Fonts.Regular,
    color: Theme.BLACK,
  },
  divider: {
    marginTop: 0,
    marginBottom: 10,
  },
});

export default TitleWithArrow;
