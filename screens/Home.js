import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import QrCode from './QrCode';

const Tab = createBottomTabNavigator();

export default function Home({route}) {
  const user = route.params.user;
  const pseudo = route.params.pseudo;
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: 'white',
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 70,
          backgroundColor: '#659224',
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIconStyle: {display: 'none'},
          tabBarLabelStyle: {color: 'white', fontSize: 15, fontWeight: 'bold'},
        }}
        initialParams={{user: user, pseudo: pseudo}}
      />
      <Tab.Screen
        name="QrCode"
        component={QrCode}
        options={{
          tabBarLabel: 'Qr Code',
          tabBarIconStyle: {display: 'none'},
          tabBarLabelStyle: {color: 'white', fontSize: 15, fontWeight: 'bold'},
        }}
        initialParams={{user: user, pseudo: pseudo}}
      />
    </Tab.Navigator>
  );
}
