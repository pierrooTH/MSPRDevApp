import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

const HomeScreen = ({route}) => {
  const pseudo = route.params.pseudo;
  const user = route.params.user;
  const [inventoryInPossession, setInventoryInPossession] = useState([]);
  const [inventoryNoPossession, setInventoryNoPossession] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

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

  console.log(inventoriesNoPossession[0]);

  const renderItem = ({item, i}) => (
    <View key={i}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={{fontSize: 20}}>{item}</Text>
      </View>
    </View>
  );

  const renderItemInventoryFalse = ({item, i}) => (
    <View key={i} style={{flexDirection: 'column'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Text style={{fontSize: 20}}>{item}</Text>
      </View>
    </View>
  );

  const returnImage = () => {
    if (pseudo === 'cberthier') {
      return (
        <Image style={styles.img} source={require('../assets/cberthier.png')} />
      );
    } /*else if (pseudo === 'jmacclane') {
      return <Image style={styles.img} source={require('../assets/jmacclane.png')} />;
    } else if (pseudo === 'afoley') {
      return <Image style={styles.img} source={require('../assets/afoley.png')} />;
    } else if (pseudo === 'jrouletabille') {
      return <Image style={styles.img} source={require('../assets/jrouletabille.png')} />;
    } else if (pseudo === 'jwest') {
      return <Image style={styles.img} source={require('../assets/jwest.png')} />;
    } else if (pseudo === 'mriggs') {
      return <Image style={styles.img} source={require('../assets/mriggs.png')} />;
    } else if (pseudo === 'sconnor') {
      return <Image style={styles.img} source={require('../assets/sconnor.png')} />;
    } else if (pseudo === 'sholmes') {
      return <Image style={styles.img} source={require('../assets/sholmes.png')} />;
    }*/
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
        {pseudo}
      </Text>
      {returnImage()}
      <ScrollView style={{width: '100%'}}>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Objets en possession :
          </Text>
          {inventories[0]}
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Objets non possédés :
          </Text>
          {inventoriesNoPossession[0]}
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
    marginTop: 40,
  },
});

export default HomeScreen;
