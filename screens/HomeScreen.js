import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({route}) => {
  const pseudo = route.params.pseudo;
  const user = route.params.user;
  const [inventoryInPossession, setInventoryInPossession] = useState([]);
  const [inventoryNoPossession, setInventoryNoPossession] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [show, setShow] = useState(false);

  const getInventory = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/inventory?user=${user.user.id}&in_possession=True`,
      );
      if (response.status === 200) {
        setInventoryInPossession(response.data);
        try {
          const dataInventoryNoInPossession = await axios.get(
            `http://127.0.0.1:8000/api/inventory?user=${user.user.id}&in_possession=False`,
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

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 70,
          textAlign: 'center',
        }}>
        Bienvenue, {'\n'}
        <Text>{pseudo}</Text>
      </Text>
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
            marginBottom: 70,
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
              width: '50%',
              marginRight: 'auto',
              marginLeft: 'auto',
              borderRadius: 8,
            }}>
            {!show && (
              <Button
                color="white"
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
    width: 270,
    height: 200,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20,
  },
});

export default HomeScreen;
