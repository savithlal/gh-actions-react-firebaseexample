import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../../Styles/Font';

const InspectionCard = ({data, index, onItemClick}) => {
  return (
    <TouchableOpacity style={styles.itemView} onPress={() => onItemClick()}>
      <View
        style={{
          backgroundColor: Theme.PERCENTAGE_BLUE,
          width: data.Percentage ? data.Percentage + '%' : '0%',
          height: 70,
          position: 'absolute',
        }}></View>
      <View style={styles.flatLIstItemContainer}>
        <Text style={styles.flatListItemName}>{data.category_name}</Text>
        <IonIcon
          name="chevron-forward"
          size={25}
          color={Theme.GREY}
          onPress={() => {}}
          style={styles.iconStyle}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    // margin: 10,
    borderBottomColor: Theme.LIGHT_GREY,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: Theme.LIGHT_GREY,
    height: 71,
    justifyContent: 'center',
  },
  flatLIstItemContainer: {
    margin: 10,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: Theme.GREY_LIGHT,
  },
  flatListItemName: {
    fontSize: 19,
    fontFamily: Fonts.Regular,
    color: Theme.BLACK,
    marginLeft: 15,
  },
});

export default InspectionCard;
