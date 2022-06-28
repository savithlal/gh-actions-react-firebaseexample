import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Theme} from '../../Styles/Theme';
import Headers from '../../Components/Header/Headers';
import {Fonts} from '../../Styles/Font';
import InspectionCard from '../../Components/Cards/InspectionCard';
import AddButton from '../../Components/Buttons/AddButton';
import {useDispatch, useSelector} from 'react-redux';
import {updateCategoryList} from '../../Redux/Actions/CategoryListReducerActions';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';
import idx from 'idx';
import {storeBasicPageDetails} from '../../Redux/Actions/BasicReducerActions';
//Home page for listing the inspection item and percentage of complete
//Author Charles
const CategoryList = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categoryList = useSelector(state => state.categoryListReducer);
  const inspectionDetails = useSelector(state => state.inspectionReducer);
  const [isLoading, setLoader] = useState(false);
  const [data, setData] = useState(null);

  const storeBasicPageDetailsApi = params =>
    dispatch(storeBasicPageDetails(params));

  useEffect(() => {
    init();
    savePageId();
  }, []);

  const savePageId = () => {
    let params = {name: 'template_id', value: '2'};
    storeBasicPageDetailsApi(params);
  };

  const init = () => {
    setLoader(true);

    let data = idx(inspectionDetails, _ => _.inspectionDetailsRes.data);
    let template_id = data?.orderservice[0]?.service?.servicetemplate[0]?.template_id
    console.log("---------- inspectionDetails 1 ", template_id)

    const apiData = { template_id: template_id };
    dispatch(updateCategoryList(apiData));
  };

  useEffect(() => {
    if (categoryList.categoryList) {
      let data = idx(categoryList, _ => _.categoryList);
      setData(data);
      setLoader(false);
    }
  }, [categoryList.categoryList]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers title={'Inspection'} canGoBack={true} titleLeft={true} />
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <View>
          {/* <Text style={styles.heading}>RESIDENTIAL INSPECTION</Text> */}
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <InspectionCard
                data={item}
                index={index}
                onItemClick={() =>
                  navigation.navigate('LineItem', {
                    // item: item.details,
                    id: item.category_id,
                    name: item.category_name,
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onRefresh={() => init()}
            refreshing={false}
          />
          <AddButton
            name={'+ SECTION'}
            onItemClick={() => navigation.navigate('InspectionListView')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
  heading: {
    fontSize: 12,
    fontFamily: Fonts.Bold,
    color: Theme.GREY,
    marginTop: 35,
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default CategoryList;
