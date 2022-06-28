import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {InputComponent} from '../../Components/InputComponent/Index';
import {Theme} from '../../Styles/Theme';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Headers from '../../Components/Header/Headers';
import InspectionDetailCard from '../../Components/Cards/InspectionDetailCard';
import SearchBox from '../../Components/SearchBox/SearchBox';
import {DropDownList} from '../../Components/InputComponent/DropDownList';

const InspectionDetail = ({route}) => {
  const [getData, setGetData] = useState([]);
  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);
  const itemNo = useRef(0);
  const navigation = useNavigation();

  useEffect(() => {
    setId(route.params.id);
  }, []);

  const onBlurClick = index => {
    //  setCheckData(!checkData);
    saveUsers();
  };

  const submitUser = () => {
    return new Promise(function (resolve, reject) {
      let key;
      key = 123;

      let dataToSave = {dataValue: getData[itemNo.current].dataValue};
      database()
        .ref('storeData/items/' + id + '/details/' + itemNo.current + '/')
        .update(dataToSave)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const saveUsers = () => {
    submitUser()
      .then(result => {})
      .catch(error => {
        console.log(error);
      });
  };

  const getItem = (data, index) => {
    itemNo.current = index;
    let arr = [...getData];
    arr[index].dataValue = data;

    setGetData(arr);
  };

  useEffect(() => {
    const userRef = database().ref(
      'storeData/items/' + route.params.id + '/details/',
    );
    const OnLoadingListener = userRef.on('value', snapshot => {
      setGetData(snapshot.val());
    });

    return () => {
      userRef.off('value', OnLoadingListener);
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Headers title={route.params.name} canGoBack={true} />
      <SearchBox />

      <FlatList
        data={getData}
        renderItem={({item, index}) => (
          <InspectionDetailCard
            data={getData}
            onBlurAction={() => onBlurClick(index)}
            getItem={value => getItem(value, index)}
            item={item}
            index={index}
            onItemClick={() =>
              navigation.navigate('LineFlashTags', {data: item})
            }
            discriptionVisible={() => setVisible(true)}
          />
        )}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
      />

      <DropDownList
        data={getData}
        visibility={visible}
        close={() => setVisible(false)}
        onPress={item => {
          // getSelectedData(item);
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
  pageHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flatLIstItemContainer: {
    borderBottomColor: Theme.grey_3,
    borderBottomWidth: 1,
    flex: 1,
  },
  innerContainer: {
    margin: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  BoxStyle: {
    width: 36,
    height: 36,
    backgroundColor: Theme.online,
    marginTop: 38,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InspectionDetail;
