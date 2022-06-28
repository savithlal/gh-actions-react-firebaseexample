import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import ButtonChip from '../../../Components/Chip/ButtonChip';
const descriptionObject = [
  {id: '1', name: 'Draft', action: ''},
  {id: '2', name: 'Complete', action: ''},
  {id: '3', name: 'Cancelled', action: ''},
  {id: '4', name: 'Scheduled', action: ''},
];
//this page for show search item chip
//Author Charles
const ChipItems = ({selectedChipItem, onpressSearchIcon}) => {
  const [saveSelectItem, setSaveSelectitem] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
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
    setInitLoading(true);
  };
  useEffect(() => {
    if (initLoading) {
      selectedChipItem(saveSelectItem);
      onpressSearchIcon();
    }
  }, [saveSelectItem]);
  return (
    <View style={styles.checkboxContainer}>
      {descriptionObject.map((item, index) => (
        <ButtonChip
          value={item.name}
          id={item.name}
          onItemClick={onClickSelectedItem}
          checked={saveSelectItem.includes(item.name) ? true : false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 15,
    marginTop: -5,
  },
});

export default ChipItems;
