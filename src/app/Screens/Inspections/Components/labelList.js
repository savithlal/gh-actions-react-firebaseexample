import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LabelBox from '../../../Components/Labels/LabelBox';
import Title from '../../../Components/Title/Title';

/**
 * LabelList(): Returns the labelList
 * @returns 
 * @author Vivek PS
 */
const LabelList = ({ labelData, title }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [location, setLocation] = useState("")

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
    <View style={styles.mainContainer}>
      <Title name={title} customStyle={styles.title} />
      <View style={styles.checkboxContainer}>
        {labelData.map(item => (
          <LabelBox
            name={item}
            id={item}
            customStyle={styles.labelbox}
            onItemClick={() => onClickSelectedItem(item)}
            isSelected={selectedItems.includes(item) ? true : false}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  labelbox: {
    marginBottom: 15,
    width: '30%',
    marginHorizontal: "1.6%"
  },
  checkboxContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginTop: 10,
    marginHorizontal: 15,
  },
});

export default LabelList;
