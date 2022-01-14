import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Trending from './screens/Trending/Index';
import Starred from './screens/Starred/Index';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 60,
          },
          tabBarIconStyle: {
            marginBottom: -4,
          },
          tabBarLabelStyle: {
            marginTop: -4,
            marginBottom: 8,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}>
        <Tab.Screen
          name="Trending"
          component={Trending}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-trending-up" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Starred"
          component={Starred}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ios-star" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
