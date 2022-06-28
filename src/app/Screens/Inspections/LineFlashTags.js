import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Text} from 'react-native';
import {Theme} from '../../Styles/Theme';
import Headers from '../../Components/Header/Headers';
import Title from '../../Components/Title/Title';
import CheckboxItems from './Components/CheckboxItems';
import LineItemButtons from './Components/LineItemButtons';
import Divider from '../../Components/Divider/Divider';
import Information from './Components/Information';
import LocationSelection from './LocationSelection';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLieInputControls,
  getLieInputControlsClear,
  storeLieInputControls,
} from '../../Redux/Actions/LineItem';
import {cos} from 'react-native-reanimated';
import idx from 'idx';
import LineItemSelection from '../../Components/LineItemSelection/LineItemSelection';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';
//this page for show flashings item
//Author Charles
const LineFlashTags = (props) => {
  console.log("-------------- LineFlashTags props ",props.route.params.data.line_id)
  const lineID = props.route.params.data.line_id
  const [getData, setGetData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [addState, setAddState] = useState(false);

  const dispatch = useDispatch();

  const lineItemReducer = useSelector(state => state.LineItemReducer);
  const basicDetailsReducer = useSelector(state => state.BasicDetailsReducer);
  useEffect(() => {
    init();
    return () => {
      dispatch(getLieInputControlsClear());
    };
    // setId(route.params.id);
  }, []);

  const init = () => {
    setLoader(true);
    let params = {line_id: lineID};
    dispatch(getLineInputControls(params));
  };

  const storeLineInputControls = () => {};

  useEffect(() => {
    if (lineItemReducer.getLineInputControlRes) {
      let data = idx(lineItemReducer, _ => _.getLineInputControlRes.data);
      setGetData(data);
      setLoader(false);
    }
  }, [lineItemReducer.getLineInputControlRes]);
  const getFromChild = value => {
    // alert(value);
  };

  const addPress = () => {
    setAddState(true);
  };

  const getstore = () => {
    alert(basicDetailsReducer.storeBasicPageDetailsRes.inspection_id);
  };

  useEffect(() => {
    if (addState) {
      setAddState(false);
    }
  }, [addState]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers title={'Flashings'} canGoBack={true} />
      <ScrollView>
        {loader ? (
          <FullScreenLoader />
        ) : (
          getData?.map(item => (
            <LineItemSelection
              data={item}
              passTopArent={getFromChild}
              passToChild={addState}
            />
          ))
        )}
        <Text onPress={() => addPress()}>Add</Text>
        <Text onPress={() => getstore()}>basic data</Text>
        <LineItemButtons />
        <Divider />
        <Information />
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
});

export default LineFlashTags;
