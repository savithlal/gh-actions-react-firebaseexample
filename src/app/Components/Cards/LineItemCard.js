import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Fonts} from '../../Styles/Font';
import {InputComponent} from '../InputComponent';
import {LineItemInput} from '../InputComponent/LineItemInput';
import LineItemFlagChip from '../Chip/LineItemFlagChip';
const LineItemCard = ({
  data,
  onBlurAction,
  getItem,
  item,
  index,
  onItemClick,
  discriptionVisible,
  onPressItem,
  checkSelected = false,
}) => {
  return (
    <View style={styles.flatLIstItemContainer}>
      <View style={styles.innerContainer}>
        {checkSelected ? (
          <IonIcon
            name="checkmark"
            size={22}
            color={Theme.SECONDARY_BLUE}
            style={styles.iconStyle}
          />
        ) : (
          <View style={styles.emptyIcon} />
        )}
        <View style={{flex: 1}}>
          <LineItemInput
            title={item.line_name}
            onPressItem={onPressItem}
            // titleStyle={{fontFamily: 'Montserrat-Regular'}}
            placeholder={'Material'}
            //  error={userNameErr}
            onBlur={() => onBlurAction(index)}
            value={data[index].dataValue}
            onChangeText={getItem}
            style={{flex: 1, marginLeft: 5, marginTop: -8, marginRight: 25}}
            titleStyle={{
              color: checkSelected ? Theme.SECONDARY_BLUE : Theme.BLACK,
            }}
          />
          {/* <LineItemFlagChip type={true} value={'1 Inspected'} /> */}
        </View>
        {/* <TouchableOpacity
          onPress={() => discriptionVisible()}
          style={styles.BoxStyle}>
          <IonIcon
            name="chevron-forward"
            size={22}
            color={Theme.White}
            style={styles.iconStyle}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => onItemClick()}>
          <IonIcon
            name="chevron-forward"
            size={30}
            color={Theme.GREY}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
  mainView: {
    flex: 1,

    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pageHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatLIstItemContainer: {
    borderBottomColor: Theme.grey_3,
    borderBottomWidth: 1,
    flex: 1,
  },
  innerContainer: {
    margin: 16,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  BoxStyle: {
    width: 36,
    height: 36,
    backgroundColor: Theme.online,
    marginTop: 38,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {},
  emptyIcon: {
    marginHorizontal: 15,
  },
});

export default LineItemCard;
