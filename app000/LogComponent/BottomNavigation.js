import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import BelanjaScreen from '../screens/BelanjaScreen';
import ChatScreen from './ChatScreen';
import FavoritScreen from './FavoritScreen';
import SettingScreen from './SettingScreen';

// Impor ikon
import HomeIcon from '../assets/icons/home.png'
import FavoritIcon from '../assets/icons/favorit.png';
import ChatIcon from '../assets/icons/chat.png';
import SettingIcon from '../assets/icons/account.png';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Pasarku':
              iconName = HomeIcon;
              break;
            case 'Favorit':
              iconName = FavoritIcon;
              break;
            case 'Chat':
              iconName = ChatIcon;
              break;
            case 'Pengaturan':
              iconName = SettingIcon;
              break;
            default:
              iconName = HomeIcon;
          }

          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Pasarku" component={BelanjaScreen} />
      <Tab.Screen name="Favorit" component={FavoritScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Pengaturan" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
