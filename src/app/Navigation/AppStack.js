import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeNavigation from './HomeNavigation';
import CameraScreen from '../Screens/Camera/Index';
import VideoRecorder from '../Screens/Camera/VideoRecorder';
import GalleryScreen from '../Screens/Gallery';
import RealTimeDb from '../Screens/RealTImeDb';
import LineItem from '../Screens/LineItem/Index';
import LineItemDetail from '../Screens/LineItem/LineItemDetail';
import ChatModule from '../Screens/Chat';
import LocationSelection from '../Screens/Inspections/LocationSelection';

/**
 * AppStack(): Contains all the screens which comes after after login
 * @returns
 * @author Vivek PS
 */
const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const rootNavigationScreenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator
      screenOptions={rootNavigationScreenOptions}
      initialRouteName="homeNavigation">
      <Stack.Screen name="homeNavigation" component={HomeNavigation} />
      <Stack.Screen name="camera" component={CameraScreen} />
      <Stack.Screen name="VideoRecorder" component={VideoRecorder} />
      <Stack.Screen name="chat" component={ChatModule} />
      <Stack.Screen name="gallery" component={GalleryScreen} />
      <Stack.Screen name="realTimeDb" component={RealTimeDb} />
      <Stack.Screen name="lineItem" component={LineItem} />
      <Stack.Screen name="LineItemDetail" component={LineItemDetail} />
      <Stack.Screen name="LocationSelection" component={LocationSelection} />
    </Stack.Navigator>
  );
};

export default AppStack;
