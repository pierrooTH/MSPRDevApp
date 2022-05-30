import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Home from './screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [currentUserData, setCurrentUserData] = useState('');
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const parsedUserData = JSON.parse(jsonValue) || {};
      setCurrentUserData(parsedUserData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
    return () => {
      setCurrentUserData('');
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!currentUserData.user ? 'LoginScreen' : 'Home'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#385fc2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: 'white',
            fontSize: 25,
            fontFamily: 'Roboto-Regular',
          },
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
