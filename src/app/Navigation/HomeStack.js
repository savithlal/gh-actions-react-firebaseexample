import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CategoryList from "../Screens/CategoryList";
import Dashboard from "../Screens/Home/Dashboard";
import InspectionDetails from "../Screens/InspectionDetails/InspectionDetails";

const Stack = createNativeStackNavigator();
const screenOptions = {
    headerShown: false,
    initialRouteName: 'Inspections',
};
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="InspectionDetails" component={InspectionDetails} />
            <Stack.Screen name="CategoryList" component={CategoryList} />
        </Stack.Navigator>
    );
};

export default HomeStack;