import React, {useState} from 'react';
import CheckboxItems from '../../Screens/Inspections/Components/CheckboxItems';
import LabelList from '../../Screens/Inspections/Components/labelList';

import {View, Text} from 'react-native';
//selectiong the line item
//Author Charles

const LineItemSelection = ({data, passTopArent, passToChild}) => {
  const [trigger, setTrigger] = useState(false);
  const selectedItems = values => {
    //  alert(values);
    passTopArent(values);
  };
  const triggerData = () => {
    setTrigger(!trigger);
  };
  switch (data.input_type.input_type_id) {
    case 2:
      return (
        <View>
                 <Text onPress={() => triggerData()}>hai</Text>
                 <CheckboxItems
                   data={data.details.values}
                   title={data.prompt}
                   selectedItems={selectedItems}
                   triggerData={passToChild}
                 />
               </View>
      );
    case 1:
      return (
        <LabelList
          labelData={data.details.values}
          title={data.prompt}
        />

      );
    default:
      return null;
  }
};

export default LineItemSelection;
