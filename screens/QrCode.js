import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import axios from 'axios';

const QrCode = ({route}) => {
  const [qrCode, setQrCode] = useState([]);
  const [visible, setVisible] = useState(true);
  const user = route.params.user;
  const pseudo = route.params.pseudo;
  const getQrCodeData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/qr-code?user=${user.user.id}`,
      );
      if (response.status === 200) {
        setQrCode(response.data);
      } else {
        throw new Error('Erreur');
      }
    } catch (error) {
      console.log(error);
      alert('Id incorrect');
    }
  };

  useEffect(() => {
    getQrCodeData();
  }, []);

  if (qrCode.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>
          Qr Code de {pseudo}
        </Text>
        <Image
          source={{uri: qrCode[0].qr_code}}
          style={{
            marginTop: 15,
            width: 300,
            height: 300,
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#379EC1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrCode;
