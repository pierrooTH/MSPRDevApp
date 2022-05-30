import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faXmark,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({route}) => {
  const pseudo = route.params.pseudo;
  const user = route.params.user;
  const [inventoryInPossession, setInventoryInPossession] = useState([]);
  const [inventoryNoPossession, setInventoryNoPossession] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const baseUrl =
    Platform.OS === 'ios' ? 'http://127.0.0.1:8000' : 'http://10.0.2.2:8000';

  const getInventory = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/inventory?user=${user.user.id}&in_possession=True`,
      );
      if (response.status === 200) {
        setInventoryInPossession(response.data);
        try {
          const dataInventoryNoInPossession = await axios.get(
            `${baseUrl}/api/inventory?user=${user.user.id}&in_possession=False`,
          );
          if (dataInventoryNoInPossession.status === 200) {
            setInventoryNoPossession(dataInventoryNoInPossession.data);
          } else {
            throw new Error('Erreur');
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        throw new Error('Erreur');
      }
    } catch (error) {
      console.log(error);
      alert('Id incorrect');
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  const inventories = inventoryInPossession.map(i => {
    return i.inventories.map((inv, i) => {
      return (
        <View key={i} style={{flexDirection: 'column'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 20}}>{inv.name}</Text>
          </View>
        </View>
      );
    });
  });

  const inventoriesNoPossession = inventoryNoPossession.map(i => {
    return i.inventories.map((inv, i) => {
      if (show) {
        return (
          <View key={i} style={{flexDirection: 'column'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={{fontSize: 20}}>{inv.name}</Text>
            </View>
          </View>
        );
      }
    });
  });

  const returnImage = () => {
    if (pseudo === 'cberthier') {
      return (
        <Image style={styles.img} source={require('../assets/cberthier.png')} />
      );
    } else if (pseudo === 'jmacclane') {
      return (
        <Image style={styles.img} source={require('../assets/jmacclane.png')} />
      );
    } else if (pseudo === 'afoley') {
      return (
        <Image style={styles.img} source={require('../assets/afoley.png')} />
      );
    } else if (pseudo === 'jrouletabille') {
      return (
        <Image
          style={styles.img}
          source={require('../assets/jrouletabille.png')}
        />
      );
    } else if (pseudo === 'jwest') {
      return (
        <Image style={styles.img} source={require('../assets/jwest.png')} />
      );
    } else if (pseudo === 'mriggs') {
      return (
        <Image style={styles.img} source={require('../assets/mriggs.png')} />
      );
    } else if (pseudo === 'sconnor') {
      return (
        <Image style={styles.img} source={require('../assets/sconnor.png')} />
      );
    } else if (pseudo === 'sholmes') {
      return (
        <Image style={styles.img} source={require('../assets/sholmes.png')} />
      );
    }
  };

  const showObjects = () => {
    setShow(!show);
  };

  const submitButton = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('pseudo');
      setModalVisible(false);
      navigation.navigate('LoginScreen');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: Platform.OS === 'ios' ? 70 : 30,
          textAlign: 'center',
        }}>
        Bienvenue, {'\n'}
        <Text>{pseudo}</Text>
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Voulez-vous vous déconnecter ?</Text>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.submitBtn]}
                onPress={submitButton}>
                <Text style={styles.textStyle}>Se deconnecter</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Annuler</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{position: 'absolute', right: 20, top: 90}}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size={30}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
      {returnImage()}
      <ScrollView style={{width: '100%', marginTop: 20, marginBottom: 20}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 15,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 30,
            marginBottom: 30,
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Objets en possession :
            </Text>
            {inventories[0]}
          </View>
          <View
            style={{
              marginTop: 30,
              backgroundColor: '#659224',
              color: 'white',
              width: '70%',
              marginRight: 'auto',
              marginLeft: 'auto',
              borderRadius: 8,
            }}>
            {!show && (
              <Button
                color={Platform.OS === 'ios' ? 'white' : '#659224'}
                title="Voir les autres objets"
                onPress={showObjects}
              />
            )}
          </View>
          <View style={{flexDirection: 'column'}}>
            {show && (
              <View>
                <Text
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Objets non possédés :
                </Text>
                <View style={{position: 'absolute', right: 5, top: 22}}>
                  <TouchableOpacity onPress={showObjects}>
                    <View>
                      <FontAwesomeIcon icon={faXmark} size={30} color="red" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {inventoriesNoPossession[0]}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#379EC1',
    alignItems: 'center',
  },
  img: {
    width: '90%',
    height: 230,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 70,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  submitBtn: {
    backgroundColor: '#659224',
  },
  buttonClose: {
    backgroundColor: '#659224',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
