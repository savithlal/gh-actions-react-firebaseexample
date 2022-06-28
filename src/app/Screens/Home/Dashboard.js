import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Keyboard,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Theme} from '../../Styles/Theme';
import {Fonts} from '../../Styles/Font';
import SearchBox from '../../Components/SearchBox/SearchBox';
import ListItem from './Components/ListItem';
import HeaderWithHamburger from '../../Components/Header/HeaderWithHamburger';
import {
  changeStatusBarColor,
  changeStatusBarStyle,
} from '../../Redux/Actions/SharedReducerActions';
import {useDispatch, useSelector} from 'react-redux';
import ListItemHeader from './Components/ListItemHeader';
import ListItemFooter from './Components/ListItemFooter';
import idx from 'idx';
import moment from 'moment';
import {getItem} from '../../Utilities/AsyncUtils';
import {Strings} from '../../Utilities/Strings';
import {getDateBasedInspectionList} from '../../Redux/Actions/InspectionReducerActions';
import {filterArrayByValue} from '../../Utilities/Filters';

const Dashboard = props => {
  const [searchText, setSearchText] = useState('');
  const [inspectionList, setInspectonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const InspectionReducer = useSelector(state => state.inspectionReducer);
  const authReducer = useSelector(state => state.AuthReducer);
  const pageNo = useRef(1);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(changeStatusBarColor(Theme.PRIMARY_GREEN));
      dispatch(changeStatusBarStyle('light-content'));
      return () => {
        dispatch(changeStatusBarColor('white'));
        dispatch(changeStatusBarStyle('dark-content'));
      };
    }, []),
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (InspectionReducer.landingScreenInspectionList) {
      storeData();
    }
  }, [InspectionReducer.landingScreenInspectionList]);

  const init = () => {
    setLoading(true);
    pageNo.current = 1;
    callApi();
    setInspectonList([]);
  };

  const callApi = async () => {
    let today = moment(new Date()).format('YYYY-MM-DD');
    let params = {
      company_id: authReducer?.loginRes?.data?.data?.company_id,
      role_id: authReducer?.loginRes?.data?.data?.role_data?.role_id,
      user_id: await getItem(Strings.USER_ID),
      page: pageNo.current,
      date: today,
      // date: '2022-05-02',
    };
    getDateBasedInspectionListApi(params);
  };

  const getDateBasedInspectionListApi = params => {
    dispatch(getDateBasedInspectionList(params));
  };

  const storeData = () => {
    let data = idx(
      InspectionReducer,
      _ => _.landingScreenInspectionList.data.orders,
    );
    setInspectonList(data);
    setFilteredList(data);
    setFooterLoading(false);
    setLoading(false);
  };

  const onChangeText = value => {
    setSearchText(value);
    searchInspectionList(value);
  };
  const onpressSearchIcon = () => {
    searchInspectionList(searchText);
    Keyboard.dismiss();
  };

  const searchInspectionList = text => {
    if (text.length === 0) {
      setFilteredList(inspectionList);
    } else {
      let filteredArray = filterArrayByValue(inspectionList, text);
      setFilteredList(filteredArray);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderWithHamburger style={styles.header} />
      <View style={styles.container}>
        <SearchBox
          customStyle={styles.searchBox}
          onChangeText={onChangeText}
          onpressSearchIcon={onpressSearchIcon}
        />

        <ListItem
          inspectionList={filteredList}
          isLoading={isLoading}
          isFooterLoading={isFooterLoading}
          ListHeader={
            <ListItemHeader
              userName={idx(authReducer, _ => _.loginRes.data.data.user_name)}
              showHeading={filteredList?.length > 0 ? true : false}
            />
          }
        />

        <ListItemFooter />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Theme.White,
  },
  header: {
    backgroundColor: Theme.PRIMARY_GREEN,
  },
  searchBox: {
    borderBottomWidth: 0,
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
  container: {
    flex: 1,
  },
});

export default Dashboard;
