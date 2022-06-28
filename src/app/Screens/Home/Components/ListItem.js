import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, FlatList, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import idx from 'idx';
import moment from 'moment';
import {getDateBasedInspectionList} from '../../../Redux/Actions/InspectionReducerActions';
import InspectionCard from '../../../Components/Inspection/InspectionCard';
import BottomLoader from '../../../Components/Loader/BottomLoader';
import PageLoader from '../../../Components/Loader/PageLoader';
import NoData from '../../../Components/NoData/NoData';
import {getItem} from '../../../Utilities/AsyncUtils';
import {Strings} from '../../../Utilities/Strings';

const ListItem = ({
  serachTextValue,
  ListHeader,
  onpressSearch,
  oncallsearchPass,
  inspectionList,
  isLoading,
  isFooterLoading,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.checkboxContainer}>
      {isLoading ? (
        <PageLoader />
      ) : (
        <FlatList
          data={inspectionList}
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
                name: item.orderclient?.map((itm, index) => {
                  let name =
                    index > 0
                      ? ', ' +
                        itm.client.first_name +
                        ' ' +
                        itm.client.last_name
                      : itm.client.first_name + ' ' + itm.client.last_name;
                  return name;
                }),
                date: moment(item.start_time).format('M/DD/YYYY'),
                time: moment(item.start_time).format('hh:mm a'),
                image:
                  'https://images.unsplash.com/photo-1634915728822-5ad85582837a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
                scheduleStatus: item.status,
                paymentStatus: item.paid,
                agreementStatus: item.is_agreement_signed,
                publishingDate: 'Published Dec 24th, 2022',
                monthValue: 'Today’s inspections',
              }}
            />
          )}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={() =>
            isFooterLoading ? <BottomLoader /> : null
          }
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
