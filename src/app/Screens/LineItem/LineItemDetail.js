import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {useSelector} from 'react-redux';
import idx from 'idx';
import database from '@react-native-firebase/database';
const LineItemDetail = ({route}) => {
  const lineReducer = useSelector(state => state.lineItemReducer);
  const [getData, setGetData] = useState({});
  const [id, setId] = useState('');
  const itemNo = useRef(0);
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
      .then(result => {
        // setUserName('');
        // setPassword('');
      })
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

  const RenderLineItem = ({item, index}) => {
    return (
      <View style={styles.flatLIstItemContainer}>
        <Text style={styles.flatListItemName}>{item.name}</Text>
        <TextInput
          mode="outlined"
          activeOutlineColor="green"
          label="Username"
          style={styles.InputField}
          onChangeText={value => getItem(value, index)}
          //  defaultValue={getData[index].dataValue}
          onBlur={() => onBlurClick(index)}
          value={getData[index].dataValue}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.pageHeading}>Home</Text>
      <FlatList
        data={getData}
        renderItem={(item, index) => RenderLineItem(item, index)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
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
});

export default LineItemDetail;
