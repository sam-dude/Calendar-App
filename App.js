import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HeaderLeftButton from './components/HeaderLeftButton';
import {StyleSheet, Text} from 'react-native';

import Calendar from './screens/Calendar';
import InviteUser from './screens/InviteUser';
import Dashboard from './screens/Dashboard';
import Sync from './screens/Sync';
import Profile from './screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerTitle: '',
        headerStyle: {backgroundColor: '#FBFBFB', height: 0},
      }}
    />
  </Stack.Navigator>
);

const SyncStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Sync"
      component={Sync}
      options={{
        headerTitle: '',
        headerStyle: {backgroundColor: '#FBFBFB', height: 0},
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile Stack"
      component={Profile}
      options={{
        headerTitle: '',
        headerStyle: {backgroundColor: '#FBFBFB', height: 0},
      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FBFBFB',
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
  },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Calendar') {
            iconName = 'calendar-month-outline';
            return <MaterialIcons name={iconName} size={26} color={color} />;
          } else if (route.name === 'Sync Calendars') {
            iconName = 'sync';
            return <AntDesign name={iconName} size={20} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'account-circle-outline';
            return <MaterialIcons name={iconName} size={26} color={color} />;
          }
        },
        activeTintColor: '#FF6347', // Color for the active tab
        inactiveTintColor: '#AAAAAA', // Color for inactive tabs
        labelStyle: {fontSize: 10}, // Font size for tab labels
        tabBarLabel: ({color}) => {
          let label;

          if (route.name === 'Calendar') {
            label = 'Calendar';
          } else if (route.name === 'Sync Calendars') {
            label = 'Sync';
          } else if (route.name === 'Profile') {
            label = 'Profile';
          }

          return <Text style={{color: color}}>{label}</Text>;
        },
      })}>
      <Tab.Screen
        name="Calendar"
        component={DashboardStack}
        options={{
          headerStyle: {backgroundColor: '#FBFBFB'},
        }}
      />
      <Tab.Screen
        name="Sync Calendars"
        component={SyncStack}
        options={{
          headerStyle: {backgroundColor: '#FBFBFB'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerStyle: {backgroundColor: '#FBFBFB'},
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Add an Event"
          component={Calendar}
          options={{
            headerLeft: () => <HeaderLeftButton />,
            headerStyle: {backgroundColor: '#FBFBFB'},
          }}
        />
        <Stack.Screen
          name="Invite Friends"
          component={InviteUser}
          options={{
            headerLeft: () => <HeaderLeftButton />,
            headerStyle: {backgroundColor: '#FBFBFB'},
          }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}} // Hide header for tab navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
