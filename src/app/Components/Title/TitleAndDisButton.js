import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import AddButton from '../Buttons/AddButton';
//This section used for title
//Author Charles
const TitleAndDisButton = ({
  name,
  buttonName,
  dis1,
  dis2,
  customStyle,
  itemClick,
}) => {
  return (
    <View style={{...styles.itemView, ...customStyle}}>
      <View style={{flex: 0.6}}>
        <Text style={styles.flatListItemName}>{name}</Text>
        <Text style={styles.discription}>{dis1}</Text>
        <Text style={styles.discription}>{dis2}</Text>
      </View>
      <View style={{flex: 0.3}}>
        <AddButton
          name={buttonName}
          onItemClick={itemClick}
          textStyle={styles.buttonText}
          customStyle={styles.buttonCustom}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginLeft: 16,
    marginTop: 15,
    marginBottom: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flatListItemName: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: Theme.GREY,
  },
  discription: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Theme.BLACK,
    marginTop: 5,
  },
  buttonText: {
    marginHorizontal: 5,
    marginVertical: 7,
  },
  buttonCustom: {
    marginTop: 10,
  },
});

export default TitleAndDisButton;
