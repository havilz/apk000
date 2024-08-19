import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminHomeScreen from './AdminHomeScreen';
import StatisticsScreen from './StatisticsScreen';
import OrdersScreen from './OrderScreen';
import ReviewsScreen from './RevewScreen';
import PromotionScreen from './PromotionScreen';
import SettingsScreen from './SettingsScreen';
import PaymentScreen from './PaymentScreen';

const Drawer = createDrawerNavigator();

function AdminDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
        },
        drawerContentOptions: {
          activeTintColor: '#fff', 
          inactiveTintColor: '#ddd', 
          labelStyle: {
            fontSize: 16, 
            fontWeight: 'bold', 
            textShadowColor: '#000', 
            textShadowOffset: { width: 1, height: 1 }, 
            textShadowRadius: 2, 
          },
        },
        drawerLabelStyle: {
          fontSize: 18, 
          fontWeight: 'bold',
          color: '#fff', 
          textShadowColor: '#000',
          textShadowOffset: { width: 1, height: 1 }, 
          textShadowRadius: 2, 
        },
      }}
    >
      <Drawer.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ drawerLabel: 'Admin Home' }}
      />
      <Drawer.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ drawerLabel: 'Statistics' }}
      />
      <Drawer.Screen
        name="Orderan"
        component={OrdersScreen}
        options={{ drawerLabel: 'Orderan' }}
      />
      <Drawer.Screen
        name="Revew"
        component={ReviewsScreen}
        options={{ drawerLabel: 'Revew' }}
      />
      <Drawer.Screen
        name="Promosi"
        component={PromotionScreen}
        options={{ drawerLabel: 'Promosi' }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerLabel: 'Settings' }}
      />
      <Drawer.Screen
        name='Payment'
        component={PaymentScreen}
        options={{ drawerLabel: 'Payment' }}
      />
    </Drawer.Navigator>
  );
}

export default AdminDrawerNavigator;
