import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/Login/Index';
import {getItem} from '../Utilities/AsyncUtils';
import {Strings} from '../Utilities/Strings';
import {useDispatch, useSelector} from 'react-redux';
import AppStack from './AppStack';
import FullScreenLoader from '../Components/Loader/FullScreenLoader';
import {Theme} from '../Styles/Theme';
import {logoutUser} from '../Redux/Actions/Auth';
import moment from 'moment';

const RootNavigation = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const authReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  // Updates local token on changing login values
  useEffect(() => {
    if (authReducer?.loginRes) {
      setToken(authReducer?.loginRes?.data?.data?.token);
    } else {
      setToken('');
    }
  }, [authReducer?.loginRes]);

  useEffect(() => {
    getToken();
  }, []);

  /**
   * getToken(): Fetches saved token from async storage if available and updates the local token
   * @author Vivek PS
   */

  const getToken = async () => {
    setTimeout(async () => {
      try {
        let tokenExpDate = await getItem(Strings.EXPIRY_DATE);
        let today = new Date();
        today = moment(today).format('YYYY-MM-DD');

        if (tokenExpDate <= today) {
          dispatch(logoutUser());
          setLoading(false);
        } else {
          //  let token = await getItem(Strings.TOKEN);
          let token = authReducer?.loginRes?.data?.data?.token;
          setToken(token);
          setLoading(false);
        }
      } catch (error) {
        console.log('------------- async storage getItem error ', error);
      }
    }, 1000);
  };

  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  // Navigator containing Login and related screens
  const LoginStack = () => {
    return (
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    );
  };

  return isLoading ? (
    <FullScreenLoader color={Theme.PRIMARY_COLOR} />
  ) : token ? (
    <AppStack />
  ) : (
    <LoginStack />
  );
};

export default RootNavigation;
