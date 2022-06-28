import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Theme} from '../../Styles/Theme';
import {useNavigation} from '@react-navigation/native';
import Headers from '../../Components/Header/Headers';
import SearchBox from '../../Components/SearchBox/SearchBox';
import {DropDownList} from '../../Components/InputComponent/DropDownList';
import LineItemCard from '../../Components/Cards/LineItemCard';
import TitleWithArrow from '../../Components/Title/TitleWithArrow';
import AddButton from '../../Components/Buttons/AddButton';
import {getLineItem} from '../../Redux/Actions/LineItem';
import idx from 'idx';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';
import {storeBasicPageDetails} from '../../Redux/Actions/BasicReducerActions';

const LineItem = ({route}) => {
  const [getData, setGetData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const [lineItemControls, setLineItemControls] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lineItemReducer = useSelector(state => state.LineItemReducer);
  const lineInputControlReducer = useSelector(state => state.LineItemReducer);

  const storeBasicPageDetailsApi = params =>
    dispatch(storeBasicPageDetails(params));

  useEffect(() => {
    init();
    savePageId();
    // setId(route.params.id);
  }, []);

  const init = () => {
    setLoader(true);
    let params = {category_id: route.params.id};
    dispatch(getLineItem(params));
  };

  const savePageId = () => {
    let params = {name: 'category_id', value: route.params.id};
    storeBasicPageDetailsApi(params);
  };

  useEffect(() => {
    if (lineItemReducer.getLineItemRes) {
      let data = idx(lineItemReducer, _ => _.getLineItemRes.data);
      setGetData(data);
      setLoader(false);
    }
  }, [lineItemReducer.getLineItemRes]);


  useEffect(() => {
    if (lineInputControlReducer.getLineInputControlRes) {
      console.log("----------------- lineInputControlReducer ", lineInputControlReducer.getLineInputControlRes)
      let data = idx(lineInputControlReducer, _ => _.getLineInputControlRes.data);
      console.log("------------- data1 ------------ ", data)
      // console.log("------------- data ------------ ", data[0]?.details?.values)
      setLineItemControls(data||[])
    }
  }, [lineInputControlReducer.getLineInputControlRes]);

  const onPressItem = async (item) => {
    console.log("--------------- pressed ", item)
    setLineItemControls([])
    let params = { line_id: item.line_id };
    await dispatch(getLineInputControls(params));
    setVisible(true);
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers title={route.params.name} canGoBack={true} titleLeft={true} />
      <SearchBox />
      {loader ? (
        <FullScreenLoader />
      ) : (
        <FlatList
          data={getData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <LineItemCard
              data={getData}
              onPressItem={() => onPressItem(item)}
              onBlurAction={() => null}
              getItem={value => null}
              item={item}
              index={index}
              onItemClick={() =>
                navigation.navigate('LineFlashTags', {data: getData})
              }
              discriptionVisible={() => {
                setVisible(true)
              }}
            />
          )}
          showsVerticalScrollIndicator={true}
          ListHeaderComponent={<TitleWithArrow name={'Disclaimer text'} />}
          ListFooterComponent={<AddButton name={'+ SECTION'} />}
          onRefresh={() => init()}
          refreshing={false}
        />
      )}

        < DropDownList
          data={lineItemControls.length > 0 ?lineItemControls[0]?.details?.values:[]}
          visibility={visible}
          close={() => setVisible(false)}
          onPress={item => {
            // getSelectedData(item);
            console.log("--------------- pressed ", item)
            setVisible(false);
          }}
        // titleList={titleList}
      />
    </SafeAreaView>
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
});

export default LineItem;
