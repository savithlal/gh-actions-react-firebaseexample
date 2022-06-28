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
import {useSelector} from 'react-redux';
import idx from 'idx';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';

const LineItem = props => {
  const lineReducer = useSelector(state => state.lineItemReducer);
  const [getData, setGetData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (lineReducer.getLineItemRes) {
      let login = idx(lineReducer, _ => _.getLineItemRes);
      //  setGetData(login[0].items);
    }
  }, [lineReducer.getLineItemRes]);

  useEffect(() => {
    const userRef = database().ref('/storeData/items');
    const OnLoadingListener = userRef.on('value', snapshot => {
      setGetData(snapshot.val());
    });

    return () => {
      userRef.off('value', OnLoadingListener);
    };
  }, []);

  const RenderLineItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LineItemDetail', {
            item: item.details,
            id: index,
            name: item.itemId,
          })
        }>
        <View style={styles.flatLIstItemContainer}>
          <Text style={styles.flatListItemName}>{item.itemId}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.pageHeading}>Home</Text>
      <FlatList
        data={getData}
        renderItem={RenderLineItem}
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

export default LineItem;
