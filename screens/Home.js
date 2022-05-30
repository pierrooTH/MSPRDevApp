import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import QrCode from './QrCode';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse, faQrcode} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

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
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#659224',
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faHouse}
                size={26}
                color={focused ? '#344913' : 'white'}
              />
            </View>
          ),
        }}
        initialParams={{user: user, pseudo: pseudo}}
      />
      <Tab.Screen
        name="QrCode"
        component={QrCode}
        options={{
          tabBarLabel: 'Qr Code',
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesomeIcon
                icon={faQrcode}
                size={26}
                color={focused ? '#344913' : 'white'}
              />
            </View>
          ),
        }}
        initialParams={{user: user, pseudo: pseudo}}
      />
    </Tab.Navigator>
  );
}
