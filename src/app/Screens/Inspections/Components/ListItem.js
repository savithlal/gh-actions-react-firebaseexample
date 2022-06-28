import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, Text, Keyboard} from 'react-native';
import InspectionCard from '../../../Components/Inspection/InspectionCard';
import {useNavigation} from '@react-navigation/native';
import {
  getinspectionListView,
  getinspectionListViewClear,
} from '../../../Redux/Actions/InspectionReducerActions';
import {useDispatch, useSelector} from 'react-redux';
import idx from 'idx';
import moment from 'moment';
import BottomLoader from '../../../Components/Loader/BottomLoader';
import PageLoader from '../../../Components/Loader/PageLoader';
import NoData from '../../../Components/NoData/NoData';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

//this page for show search item chip
//Author Charles
const ListItem = ({
  serachTextValue,
  onpressSearch,
  oncallsearchPass,
  passChipValue,
}) => {
  const [saveSelectItem, setSaveSelectitem] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [isLoadFooter, setIsLoadFooter] = useState(false);
  const [maxPageNo, setMaxPageNo] = useState(1);
  const [storeLastMonth, setStoreLastMonth] = useState('');
  const [initLoading, setInitLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getinspectionListViewApi = params =>
    dispatch(getinspectionListView(params));
  const InspectionReducer = useSelector(state => state.inspectionReducer);
  const authReducer = useSelector(state => state.AuthReducer);
  useEffect(() => {
    if (initLoading) {
      init();
    }
  }, [oncallsearchPass]);

  const pageNo = useRef(1);

  const init = () => {
    setIsLoad(true);
    pageNo.current = 1;
    callApi();
    setSaveSelectitem([]);
    setStoreLastMonth('');
  };

  useEffect(() => {
    init();
    setInitLoading(true);
    return () => {
      dispatch(getinspectionListViewClear());
    };
  }, []);

  useEffect(() => {
    if (serachTextValue.length === 0) {
      if (initLoading) {
        init();
      }
      Keyboard.dismiss();
    }
  }, [serachTextValue]);

  const callApi = async () => {
    try {
      let params = {
        user_id: idx(authReducer, _ => _.loginRes?.data?.data?.user_id),
        page: pageNo.current,
        tags: passChipValue,
        search: serachTextValue,
        company_id: authReducer?.loginRes?.data?.data?.company_id,
        role_id: authReducer?.loginRes?.data?.data?.role_data?.role_id,
      };
      console.log(params);
      getinspectionListViewApi(params);
    } catch (err) {
      console.log('callApi' + err);
    }
  };

  const loadMore = () => {
    if (pageNo.current < maxPageNo && !isLoadFooter) {
      setIsLoadFooter(true);
      pageNo.current = pageNo.current + 1;
      callApi();
    }
  };

  useEffect(() => {
    // try {
    if (InspectionReducer.allInspectionListRes) {
      storeData();
    }
    // } catch (err) {
    //   console.log('InspectionReducer.allInspectionListRes' + err);
    // }
  }, [InspectionReducer.allInspectionListRes]);

  const storeData = () => {
    let data = idx(
      InspectionReducer,
      _ => _.allInspectionListRes.data.orders.data,
    );
    setMaxPageNo(
      idx(InspectionReducer, _ => _.allInspectionListRes.data.pagecount),
    );

    for (i = 0; i < data?.length; i++) {
      data[i].month = false;
      data[i].monthValue = '';
      if (i !== 0) {
        if (
          moment(data[i].start_time).format('MMMM') !==
          moment(data[i - 1].start_time).format('MMMM')
        ) {
          data[i].month = true;
          data[i].monthValue = moment(data[i].start_time).format('MMMM');
        }
        if (i === data.length - 1) {
          setStoreLastMonth(moment(data[i].start_time).format('MMMM'));
        }
      } else {
        if (storeLastMonth !== moment(data[i].start_time).format('MMMM')) {
          data[i].month = true;
          data[i].monthValue = moment(data[i].start_time).format('MMMM');
        }
      }
      let clientName = data[i].orderclient?.map(
        itm => itm.client.first_name + ' ' + itm.client.last_name,
      );

      data[i].clientName = clientName.toString();
    }

    setSaveSelectitem([...saveSelectItem, ...data]);
    setIsLoadFooter(false);
    setIsLoad(false);
  };

  return (
    <View style={styles.checkboxContainer}>
      {isLoad ? (
        <PageLoader />
      ) : (
        <FlatList
          data={saveSelectItem}
          renderItem={({item, index}) => (
            <InspectionCard
              onPressAction={() =>
                navigation.navigate('InspectionDetails', {id: item.id})
              }
              data={{
                orderId: item.id,
                heading:
                  item.location_address +
                  ', ' +
                  item.location_city +
                  ' ' +
                  item.location_state +
                  ' ' +
                  item.location_zip,
                name: item.clientName,
                date: moment(item.start_time).format('M/DD/YYYY'),
                time: moment(item.start_time).format('hh:mm a'),
                image:
                  'https://images.unsplash.com/photo-1634915728822-5ad85582837a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
                scheduleStatus: item.status,
                paymentStatus: item.paid,
                agreementStatus: item.is_agreement_signed,
                publishingDate: 'Published Dec 24th, 2022',
                month: item.month,
                monthValue: item.monthValue,
              }}
            />
          )}
          initialNumToRender={5}
          maxToRenderPerBatch={1}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => loadMore()}
          ListFooterComponent={() => (isLoadFooter ? <BottomLoader /> : null)}
          ListEmptyComponent={() => <NoData />}
          onRefresh={() => init()}
          refreshing={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flex: 1,
  },
});

export default ListItem;
