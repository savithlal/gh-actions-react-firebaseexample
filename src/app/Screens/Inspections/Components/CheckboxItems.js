import idx from 'idx';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '../../../Components/CheckBox/CheckBox';
import Title from '../../../Components/Title/Title';
import {storeLieInputControls} from '../../../Redux/Actions/LineItem';
const descriptionObject = [
  {id: '1', name: 'Aluminium', action: ''},
  {id: '2', name: 'Copper', action: ''},
  {id: '3', name: 'Rubber', action: ''},
  {id: '4', name: 'Rubber', action: ''},
  {id: '5', name: 'Array', action: ''},
  {id: '6', name: 'Alu', action: ''},
];
const selectedItem = [];
//this page for show flashings item
//Author Charles
const CheckboxItems = ({route, data, title, selectedItems, triggerData}) => {
  const [saveSelectItem, setSaveSelectitem] = useState(selectedItem);

  const dispatch = useDispatch();

  const authReducer = useSelector(state => state.AuthReducer);
  const basicDetailsReducer = useSelector(state => state.BasicDetailsReducer);

  const storeLieInputControlsApi = params =>
    dispatch(storeLieInputControls(params));

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

  useEffect(() => {
    if (triggerData) {
      let params = {
        user_id: idx(authReducer, _ => _.loginRes?.data?.data?.user_id),
        company_id: authReducer?.loginRes?.data?.data?.company_id,
        role_id: authReducer?.loginRes?.data?.data?.role_data?.role_id,
        inspection_id:
          basicDetailsReducer?.storeBasicPageDetailsRes?.inspection_id,
        template_id: '',
        line_id: '',
        comment_input_control_id: '',
        data: saveSelectItem,
        inspection_data_id: '',
      };
      alert(saveSelectItem);
      console.log(saveSelectItem);
      selectedItems(saveSelectItem);
    }
  }, [triggerData]);
  return (
    <View>
      <Title name={title} customStyle={styles.title} />
      <View style={styles.checkboxContainer}>
        {data.map(item => (
          <CheckBox
            name={item}
            id={item}
            customStyle={styles.checkbox}
            onItemClick={onClickSelectedItem}
            checked={saveSelectItem.includes(item) ? true : false}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginRight: 50,
    marginBottom: 15,
    marginLeft: 25,
    width: '25%',
  },
  checkboxContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default CheckboxItems;
