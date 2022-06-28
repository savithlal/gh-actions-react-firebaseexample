import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import deviceInfoModule from 'react-native-device-info';
import { Fonts } from '../../Styles/Font';
import { Theme } from '../../Styles/Theme';
import AddButton from '../Buttons/AddButton';
import PlainColorButton from '../Buttons/PlainColorButton';
import Divider from '../Divider/Divider';
import DropItem from '../DropItem/DropItem';
import { CustomModal } from '../Modals/CustomModal';

const { width } = Dimensions.get('window');

export const DropDownList = ({ visibility, close, data, onPress, titleList }) => {
  const [saveSelectItem, setSaveSelectitem] = useState([]);
  const navigation = useNavigation();
  const onClickSelectedItem = item => {
    if (saveSelectItem.includes(item)) {
      let tempData = [...saveSelectItem];
      let getIndex = tempData.indexOf(item);
      if (getIndex !== -1) {
        tempData.splice(getIndex, 1);
        setSaveSelectitem(tempData);
      }
    } else {
      setSaveSelectitem([...saveSelectItem, item]);
    }
  };

  return (
    <CustomModal
      isVisible={visibility}
      onClose={close}
      isBottomSheet={deviceInfoModule.isTablet() ? false : true}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.headTitle}>Choose description</Text>
        <Text style={styles.headDis}>Default choices editable from the portal.</Text>

        <ScrollView>
          {data.map((item, index) => (
            <DropItem
              item={item}
              index={index}
              onClickSelectedItem={onClickSelectedItem}
              seletedData={saveSelectItem}
              selectedItem={saveSelectItem.includes(index) ? true : false}
            />
          ))}
          <DropItem
            item={'+ Add new'}
            index={-1}
            onClickSelectedItem={() => alert('new item')}
            selectedItem={false}
          />
        </ScrollView>

        <Divider customStyle={{ marginVertical: 15 }} />

        <View style={styles.buttonRow}>
          <AddButton
            name={'+ ADD COMMENT'}
            customStyle={{ marginHorizontal: 5, flex: 1 }}
            onItemClick={() => navigation.navigate('LineFlashTags')}
          />
          <PlainColorButton name={'DONE'} customStyle={{ marginHorizontal: 5, flex: 1 }} />
        </View>

      </View>
    </CustomModal>
  );
};
const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Theme.grey_3,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 25,
  },
  headTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    color: Theme.BLACK,
  },
  headDis: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: Fonts.Italics,
    marginTop: 8,
    marginBottom: 27,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 16
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
});
