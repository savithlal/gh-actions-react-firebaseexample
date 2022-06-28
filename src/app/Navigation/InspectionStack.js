import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Inspections from '../Screens/Inspections';
import InspectionDetail from '../Screens/Inspections/InspectionDetail';
import LineFlashTags from '../Screens/Inspections/LineFlashTags';
import ImageGallery from '../Screens/Gallery/ImageGallery';
import VideoGallery from '../Screens/Gallery/VideoGallery';
import InspectionDetails from '../Screens/InspectionDetails/InspectionDetails';
import CategoryList from '../Screens/CategoryList';
import LineItem from '../Screens/LineItem/LineItem';
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  initialRouteName: 'Inspections',
};
const InspectionStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Inspections" component={Inspections} />
      <Stack.Screen name="InspectionDetail" component={InspectionDetail} />
      <Stack.Screen name="LineFlashTags" component={LineFlashTags} />
      <Stack.Screen name="ImageGallery" component={ImageGallery} />
      <Stack.Screen name="VideoGallery" component={VideoGallery} />
      <Stack.Screen name="InspectionDetails" component={InspectionDetails} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="LineItem" component={LineItem} />
    </Stack.Navigator>
  );
};

export default InspectionStack;
