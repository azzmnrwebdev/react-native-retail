import React from 'react';
import Home from '../pages/Home/Index';
import Login from '../pages/Auth/Login';
import Order from '../pages/Order/Index';
import Splash from '../pages/Splash/Index';
import Profile from '../pages/Profile/Index';
import Wishlist from '../pages/Wishlist/Index';
import ScanBarcode from '../pages/Profile/ScanBarcode';
import BottomNavigator from '../components/BottomNavigator/Index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Order'} component={Order} />
      <Tab.Screen name={'Wishlist'} component={Wishlist} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name={'Splash'} component={Splash} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'ScanBarcode'} component={ScanBarcode} />
      <Stack.Screen name={'MainApp'} component={MainApp} />
    </Stack.Navigator>
  );
};

export default Router;
