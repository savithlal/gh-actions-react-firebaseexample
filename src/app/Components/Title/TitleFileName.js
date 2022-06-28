import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
//This section used for title
//Author Charles
const TitleFileName = ({name, customStyle}) => {
  return (
    <View style={{...styles.itemView, ...customStyle}}>
      <Text style={styles.flatListItemName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
  },

  flatListItemName: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Theme.SECONDARY_BLUE,
  },
});

export default TitleFileName;
