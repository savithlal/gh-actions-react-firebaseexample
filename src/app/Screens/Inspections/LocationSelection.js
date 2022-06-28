import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import TextBoxWithLabel from '../../Components/TextBox/TextBoxWithLabel';
import { Theme } from '../../Styles/Theme';
import CustomHeader from './Components/CustomHeader';
import LabelList from './Components/labelList';

const labelData = ['North', 'South', 'East', 'West', 'Northwest', 'Northeast', 'Southwest',
  'Southeast', 'Kitchen', 'Bedroom', 'Dining room', 'Garage', 'Closet',
  'Master', 'Basement', 'Crawlspace', '1st floor', '2nd floor', '3rd floor',
  'Living room', 'Bathroom', 'Attic', 'Utility room', 'Laundry',
];

const LocationSelection = () => {
  const [location, setLocation] = useState("")
  const [selectedItems, setSelectedItems] = useState([]);

  /**
   * onClickSelectedItem(): Action to be performed on selecting a list item
   * @param {*} item 
   * @author Vivek PS
   */
  const onClickSelectedItem = item => {
    console.log("----------- item ", item)
    if (selectedItems.includes(item)) {
      let tempData = [...selectedItems];
      let getIndex = tempData.indexOf(item);
      if (getIndex !== -1) {
        tempData.splice(getIndex, 1);
        setSelectedItems(tempData);
      }
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Updates text value when selectedItems are modified
  useEffect(() => {
    let textValue = ""
    selectedItems.map((item, index) => {
      textValue += index > 0 ? " " + item : item
    })
    setLocation(textValue)
  }, [selectedItems])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <CustomHeader
          heading="Location"
          description="Select descriptions or type custom text."
        />
        <TextBoxWithLabel
          label={"Location"}
          value={location}
          showClearButton={true}
          onClear={() => setSelectedItems([])}
        />
        <LabelList
          labelData={labelData}
          onClickSelectedItem={(value) => onClickSelectedItem(value)}
          selectedItems={selectedItems}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
  mainView: {
    paddingVertical: 20,
    paddingHorizontal: 25
  },
});

export default LocationSelection