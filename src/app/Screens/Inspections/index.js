import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Theme} from '../../Styles/Theme';
import Headers from '../../Components/Header/Headers';
import {Fonts} from '../../Styles/Font';
import SearchBox from '../../Components/SearchBox/SearchBox';
import ChipItems from './Components/ChipItems';
import ListItem from './Components/ListItem';
import PlainColorButton from '../../Components/Buttons/PlainColorButton';
//Home page for listing the inspection item and percentage of complete
//Author Charles
const Inspections = props => {
  const [getData, setGetData] = useState([]);
  const navigation = useNavigation();
  const [textValue, setTextValue] = useState('');
  const [checkPress, setCheckPress] = useState(false);
  const [chipValue, setChipValue] = useState([]);
  const onChangeText = value => {
    setTextValue(value);
  };

  const selectedChipItem = value => {
    setChipValue(value);
  };

  const onpressSearchIcon = () => {
    setCheckPress(!checkPress);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers title={'All Inspections'} canGoBack={true} />
      <View style={styles.container}>
        <SearchBox
          customStyle={styles.searchBox}
          onChangeText={onChangeText}
          onpressSearchIcon={onpressSearchIcon}
        />
        <ChipItems
          selectedChipItem={selectedChipItem}
          onpressSearchIcon={onpressSearchIcon}
        />
        <ListItem
          serachTextValue={textValue}
          oncallsearchPass={checkPress}
          passChipValue={chipValue}
        />
        <PlainColorButton name={'NEW ORDERS'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
  searchBox: {
    borderBottomWidth: 0,
  },
  heading: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: Theme.GREY,
    marginTop: 35,
    marginBottom: 10,
    marginLeft: 15,
  },
  container: {
    backgroundColor: Theme.BG_GREY,
    flex: 1,
  },
});

export default Inspections;
