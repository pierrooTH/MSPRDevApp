import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Home from './screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [currentUserData, setCurrentUserData] = useState('');
  const [pseudo, setPseudo] = useState('');
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const parsedUserData = JSON.parse(jsonValue) || {};
      setCurrentUserData(parsedUserData);
    } catch (e) {
      console.log(e);
    }
  };

  const getPseudoData = async () => {
    try {
      const pseudo = await AsyncStorage.getItem('pseudo');
      setPseudo(pseudo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
    getPseudoData();
    return () => {
      setCurrentUserData('');
      setPseudo('');
    };
  }, []);

  if (Object.keys(currentUserData).length > 0 && pseudo !== '') {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={currentUserData ? 'Home' : 'LoginScreen'}
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
            initialParams={{
              user: currentUserData,
              pseudo: pseudo,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

export default App;
