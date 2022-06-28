import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Theme} from '../../Styles/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from '../../Styles/Font';
const {width} = Dimensions.get('window');

const DropItem = ({
  item,
  index,
  showFirstIcon = false,
  selectedItem = false,
  onClickSelectedItem,
  seletedData,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onClickSelectedItem(index)}
      style={{
        ...styles.listView,
        borderColor: selectedItem ? Theme.SECONDARY_BLUE : Theme.LIGHT_GREY,
        backgroundColor: selectedItem ? Theme.LIGHT_BLUE : Theme.White,
      }}
      key={index}>
      <View style={styles.rowSet}>
        <View style={styles.rowPlain}>
          {showFirstIcon ? (
            <View style={styles.squareBox}>
              <MaterialIcons
                name="close"
                color={Theme.White}
                size={15}
                style={styles.insideSquare}
              />
            </View>
          ) : null}
          <Text style={styles.text}>{item}</Text>
        </View>
        {selectedItem ? (
          <MaterialIcons
            name="check"
            color={Theme.SECONDARY_BLUE}
            size={24}
            style={styles.insideSquare}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  inputText: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color: Theme.PRIMARY_GREY,
    padding: 0,
  },
  text: {fontFamily: Fonts.Regular, color: Theme.DARKEST_GRE, fontSize: 18},

  insideSquare: {},
  listView: {
    borderWidth: 1,

    marginHorizontal: 30,
    marginVertical: 6,
    padding: 15,
    borderRadius: 9,
    height: 56,
    justifyContent: 'center',
  },
  squareBox: {
    height: 20,
    width: 20,
    backgroundColor: Theme.color_primary_2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rowSet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowPlain: {
    flexDirection: 'row',
  },
});
export default DropItem;
