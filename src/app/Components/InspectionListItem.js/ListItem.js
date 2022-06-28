import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, Text, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import idx from 'idx';
import moment from 'moment';
import {getinspectionListView} from '../../../Redux/Actions/InspectionReducerActions';
import InspectionCard from '../../../Components/Inspection/InspectionCard';
import BottomLoader from '../../../Components/Loader/BottomLoader';
import PageLoader from '../../../Components/Loader/PageLoader';
import NoData from '../../../Components/NoData/NoData';
import {getItem} from '../../../Utilities/AsyncUtils';
import {Strings} from '../../../Utilities/Strings';

const descriptionObject = [
  {id: '1', name: 'Scheduled', action: ''},
  {id: '2', name: 'Published', action: ''},
  {id: '3', name: 'Complete', action: ''},
  {id: '4', name: 'In Progress', action: ''},
  {id: '5', name: 'Draft', action: ''},
];
const timeobj = [
  {id: '1', name: '2021-11-28 13:01:00', action: ''},
  {id: '2', name: '2021-12-28 13:01:00', action: ''},
  {id: '3', name: '2021-12-28 13:01:00', action: ''},
  {id: '4', name: '2021-10-28 13:01:00', action: ''},
  {id: '5', name: '2021-10-28 13:01:00', action: ''},
];

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getinspectionListViewApi = params =>
    dispatch(getinspectionListView(params));
  const InspectionReducer = useSelector(state => state.inspectionReducer);

  useEffect(() => {
    init();
  }, [oncallsearchPass]);

  const pageNo = useRef(1);

  const init = () => {
    setIsLoad(true);
    pageNo.current = 1;
    callApi();
    setSaveSelectitem([]);
  };
  useEffect(() => {
    // setIsLoad(true);
    // callApi();
  }, []);

  useEffect(() => {
    if (serachTextValue.length === 0) {
      init();
      Keyboard.dismiss();
    }
  }, [serachTextValue]);

  const callApi = async () => {
    let params = {
      inspector_id: await getItem(Strings.USER_ID),
      page: pageNo.current,
      tags: passChipValue,
      search: serachTextValue,
    };

    getinspectionListViewApi(params);
  };

  const loadMore = () => {
    if (pageNo.current < maxPageNo && !isLoadFooter) {
      setIsLoadFooter(true);
      pageNo.current = pageNo.current + 1;
      callApi();
    }
  };

  useEffect(() => {
    if (InspectionReducer.allInspectionListRes) {
      storeData();
    }
  }, [InspectionReducer.allInspectionListRes]);

  const storeData = () => {
    let data = idx(
      InspectionReducer,
      _ => _.allInspectionListRes.data.orders.data,
    );
    setMaxPageNo(
      idx(InspectionReducer, _ => _.allInspectionListRes.data.pagecount),
    );

    for (i = 0; i < data.length; i++) {
      data[i].month = false;
      data[i].monthValue = '';
      if (i !== 0) {
        if (
          moment(data[i].start_time).format('MMMM') !==
          moment(data[i - 1].start_time).format('MMMM')
        ) {
          console.log(data[i].start_time);
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
                heading: item.location_address + item.location_city,
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
