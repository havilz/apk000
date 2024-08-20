import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './app000/screens/HomeScreen';
import SelectBusinessTypeScreen from './app000/screens/SelectBussinesTyperScreen';
import BuyerRegistrationScreen from './app000/screens/BuyerRegistrationScreen';
import SellerInfoScreen from './app000/screens/SellerInfoScreen';
import BottomTabNavigator from './app000/LogComponent/BottomNavigation';
import AdminDrawerNavigator from './app000/components/AdinDrawerNavigation';
import SettingsScreen from './app000/components/SettingsScreen';
import GeneralSettings from './app000/components/GeneralSettings';
import NotificationSettings from './app000/components/NotivicationSettings';
import AccountSettings from './app000/components/AccountSetings';
import LoginScreen from './app000/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name="SelectBusinessType" component={SelectBusinessTypeScreen} />
        <Stack.Screen name='BuyerRegistrations' component={BuyerRegistrationScreen}/>
        <Stack.Screen name="SellerInfo" component={SellerInfoScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
        <Stack.Screen name='AccountSettings' component={AccountSettings}/>
        <Stack.Screen name="AdminScreen" component={AdminDrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
