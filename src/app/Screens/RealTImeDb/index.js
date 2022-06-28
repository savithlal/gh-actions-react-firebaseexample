import React, {useEffect, useState} from 'react';
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
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
const RealTimeDb = props => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [getData, setGetData] = useState('');
  const [saveData, setSaveData] = useState({});
  const [checkData, setCheckData] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const submitUser = () => {
    return new Promise(function (resolve, reject) {
      let key;

      key = 123;

      let dataToSave = {Id: '123', Name: userName, password: password};
      database()
        .ref('users/' + key)
        .update(dataToSave)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  useEffect(() => {
    //setUserName(getData.Name?.getData.Name);

    setPassword(getData.password);
    setUserName(getData.Name);
  }, [getData]);

  useEffect(() => {
    //setUserName(getData.Name?.getData.Name);

    if (onLoad) {
      setSaveData({Id: '123', Name: userName, password: password});
      saveUsers();
    } else {
      setOnLoad(true);
    }
  }, [checkData]);

  React.useEffect(() => {
    const userRef = database().ref('/storeData/items');
    const OnLoadingListener = userRef.on('value', snapshot => {
      setGetData(snapshot.val());
    });

    return () => {
      userRef.off('value', OnLoadingListener);
    };
  }, []);

  const addToJSON = () => {
    setSaveData({Id: '123', Name: userName, password: password});
    saveUsers();
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

  const onBlurClick = () => {
    setCheckData(!checkData);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainView}>
        <Text style={styles.pageHeading}>Home</Text>
        <TextInput
          mode="outlined"
          activeOutlineColor="green"
          label="Username"
          style={styles.InputField}
          onChangeText={value => setUserName(value)}
          value={userName}
          onBlur={() => onBlurClick()}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor="green"
          label="Username"
          style={styles.InputField}
          onChangeText={value => setPassword(value)}
          value={password}
          onBlur={() => onBlurClick()}
        />
      </View>
      <Text onPress={saveUsers}>Submit</Text>
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

export default RealTimeDb;
