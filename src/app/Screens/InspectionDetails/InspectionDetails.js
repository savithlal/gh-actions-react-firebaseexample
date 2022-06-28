import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Text} from 'react-native';
import {Theme} from '../../Styles/Theme';
import Headers from '../../Components/Header/Headers';
import ImageHeader from '../../Components/ImageHeader/ImageHeader';
import DividerThick from '../../Components/Divider/DividerThick';
import Client from './Components/Client';
import Agents from './Components/Agents';
import InspectionFees from './Components/InspectionFees';
import Agreements from './Components/Agreements';
import Templates from './Components/Templates';
import HeaderSection from './Components/HeaderSection';
import {useDispatch, useSelector} from 'react-redux';
import {
  getinspectionDetails,
  getinspectionDetailsClear,
} from '../../Redux/Actions/InspectionReducerActions';
import {storeBasicPageDetails} from '../../Redux/Actions/BasicReducerActions';
import idx from 'idx';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';
import Divider from '../../Components/Divider/Divider';

//this page for InspectionDetail
//Author Charles
const InspectionDetails = ({route}) => {
  const [inspectionData, setInspectionData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [headerValue, setHeaderValue] = useState(
    'Order #' + inspectionData?.id,
  );
  const inspectionDetails = useSelector(state => state.inspectionReducer);
  const authReducer = useSelector(state => state.AuthReducer);
  const basicDetailsReducer = useSelector(state => state.BasicDetailsReducer);
  const dispatch = useDispatch();
  const storeBasicPageDetailsApi = params =>
    dispatch(storeBasicPageDetails(params));

  useEffect(() => {
    getinspectionListViewApi();
    savePageId(); //save page name for reference
    return () => {
      dispatch(getinspectionDetailsClear());
      setInspectionData([]);
    };
  }, []);

  const savePageId = () => {
    let params = {name: 'inspection_id', value: route.params.id};
    storeBasicPageDetailsApi(params);
  };
  // Updates local state when redux value changes
  useEffect(() => {
    if (inspectionDetails.inspectionDetailsRes) {
      let data = idx(inspectionDetails, _ => _.inspectionDetailsRes.data);
      setInspectionData(data);
      setLoader(false);
    }
  }, [inspectionDetails.inspectionDetailsRes]);

  const API_DATA = {
    company_id: authReducer?.loginRes?.data?.data?.company_id,
    user_id: authReducer?.loginRes?.data?.data?.user_id,
    role_id: authReducer?.loginRes?.data?.data?.role_data?.role_id,
    inspection_id: route.params.id,
  };

  // Calls API to get selected inspection details
  const getinspectionListViewApi = () => {
    setLoader(true);
    dispatch(getinspectionDetails(API_DATA));
  };

  const addRedux = () => {
    let params = {name: 'inspection_id', value: route.params.id};
    storeBasicPageDetailsApi(params);
  };

  useEffect(() => {
    alert(JSON.stringify(basicDetailsReducer.storeBasicPageDetailsRes));
  }, [basicDetailsReducer.storeBasicPageDetailsRes]);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers
        title={inspectionData?.id ? 'Order #' + inspectionData?.id : ''}
        canGoBack={true}
        titleLeft={true}
      />
      {loader ? (
        <FullScreenLoader />
      ) : (
        <ScrollView>
          <ImageHeader />
          <Text onPress={() => addRedux()}>Add to redux</Text>
          <HeaderSection data={inspectionData} />
          <Divider />
          <Client data={inspectionData.orderclient} />
          <Divider />
          <Agents data={inspectionData.orderagent} />
          <Divider />
          <InspectionFees data={inspectionData.inspection_fees} />
          <Divider />
          <Agreements data={inspectionData.agreements} />
          <Divider />
          <Templates data={'Radeon Templates'} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
});

export default InspectionDetails;
