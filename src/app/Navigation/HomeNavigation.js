import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '../Styles/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform, StyleSheet, Text } from 'react-native';
import InspectionStack from './InspectionStack';
import { Fonts } from '../Styles/Font';
import Dashboard from '../Screens/Home/Dashboard';
import HomeStack from './HomeStack';
import deviceInfoModule from 'react-native-device-info';

Icon.loadFont();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: Theme.SECONDARY_BLUE,
  tabBarInactiveTintColor: Theme.LIGHT_TEXT,
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 80 : 56,
    //     alignItems: 'center',
    //     alignContent:'center',
    // justifyContent:'center',
  },
};

/**
 * HomeTabNavigation(): Returns bottom tab bar for home screen
 * @returns
 * @author Vivek PS
 */
const HomeTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions} initialRouteName="home">
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.bottomTabLabel, { color: color }]}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="inspections"
        component={InspectionStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.bottomTabLabel, { color: color }]}>
              Inspections
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="playlist-check"
              color={color}
              size={size}
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="route"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.bottomTabLabel, { color: color }]}>Route</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon name="map" color={color} size={size} style={styles.icon} />
          ),
          // tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
  title: 'PalmTech',
  headerStyle: {
    height: 50,
  },
};

/**
 * HomeNavigation(): Return Drawer navigation for home screen
 * @returns
 * @author Vivek PS
 */
const HomeNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={screenOptions} initialRouteName="homeTab">
      <Drawer.Screen
        name="homeTab"
        component={HomeTabNavigation}
        options={{}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    // resizeMode: 'contain',
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: deviceInfoModule.isTablet() ? 5 : 10
      },
      android: {
        top: deviceInfoModule.isTablet() ? 5 : 5
      }
    })
  },
  bottomTabLabel: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 16,
    // position: 'relative',
    // top: Platform.OS === 'android' ? -10 : 0,
    ...Platform.select({
      ios: {
        position: 'absolute',
        top: deviceInfoModule.isTablet() ? 35 : 35
      },
      android: {
        position: 'relative',
        top: -10
      },
    })
  },
});

export default HomeNavigation;
