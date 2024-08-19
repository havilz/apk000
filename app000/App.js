import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SelectBusinessTypeScreen from './screens/SelectBussinesTyperScreen';
import BuyerRegistrationScreen from './screens/BuyerRegistrationScreen';
import SellerInfoScreen from './screens/SellerInfoScreen';
import BottomTabNavigator from './LogComponent/BottomNavigation';
import AdminDrawerNavigator from './components/AdinDrawerNavigation';
import SettingsScreen from './components/SettingsScreen';
import GeneralSettings from './components/GeneralSettings';
import NotificationSettings from './components/NotivicationSettings';
import AccountSettings from './components/AccountSetings';
import LoginScreen from './screens/LoginScreen';

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
