import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Strings} from '../Constants';

export const storeItem = async (key, item) => {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {}
};

export const getItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    return null;
  }
};

// export const isLoggedIn = async () => {
//   const userData = await getItem(Strings.KEY_USER_DATA);
//   if (userData) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const removeItem = async key => {
  try {
    const jsonOfItem = await AsyncStorage.removeItem(key);

    return jsonOfItem;
  } catch (error) {}
  return;
};

export const getMultipleItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {}
  return;
};

export const setMultipleItem = async key => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {}
  return;
};

export const clearDB = async () => {
  try {
    const retrievedItem = await AsyncStorage.clear();

    return retrievedItem;
  } catch (error) {}
  return;
};
