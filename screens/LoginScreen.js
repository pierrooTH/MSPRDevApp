import React, {useState} from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHeaderHeight} from '@react-navigation/elements';

const LoginScreen = ({navigation}) => {
  const headerHeight = useHeaderHeight();
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');

  const storeDataJSON = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      alert(e);
    }
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('pseudo', value);
    } catch (e) {
      alert(e);
    }
  };

  const baseUrl = 'https://apimspr.herokuapp.com';

  const onSubmit = async () => {
    if (!pseudo.trim() || !password.trim()) {
      alert('Nom ou mot de passe invalide');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        username: pseudo,
        password: password,
      });
      if (response.status === 200) {
        console.log(response.data);
        await storeDataJSON(response.data);
        await storeData(pseudo);
        setPseudo('');
        setPassword('');
        navigation.navigate('Home', {
          user: response.data,
          pseudo: pseudo,
        });
      } else {
        throw new Error('Erreur');
      }
    } catch (error) {
      console.log(error);
      alert('Nom ou mot de passe incorrect');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <View>
          <Image
            source={require('../assets/logo-mspr-dev-app.png')}
            style={styles.img}
          />
        </View>
        <View style={{marginTop: 30}}>
          <TextInput
            style={[styles.input, {color: 'black'}]}
            placeholder="Nom"
            placeholderTextColor={'grey'}
            onChangeText={text => setPseudo(text)}
            value={pseudo}
          />
          <TextInput
            style={[styles.input, {color: 'black'}]}
            placeholder="Mot de passe"
            placeholderTextColor={'grey'}
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#659224',
            width: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
            borderRadius: 5,
          }}>
          <Button
            title="Se connecter"
            color={Platform.OS === 'ios' ? 'white' : '#659224'}
            onPress={onSubmit}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#379EC1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    height: '55%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#659224',
  },
  img: {
    width: 150,
    height: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 40,
  },
  input: {
    margin: 12,
    borderRadius: 12,
    backgroundColor: '#ececec',
    padding: 15,
    height: 55,
    width: '90%',
  },
});

export default LoginScreen;
