import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleInfo, faXmark} from '@fortawesome/free-solid-svg-icons';

const QrCode = ({route}) => {
  const [qrCode, setQrCode] = useState([]);
  const [showInfos, setShowInfos] = useState(false);
  const user = route.params.user;
  const pseudo = route.params.pseudo;
  const baseUrl =
    Platform.OS === 'ios' ? 'http://127.0.0.1:8000' : 'http://10.0.2.2:8000';
  const getQrCodeData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/qr-code?user=${user.user.id}`,
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

  const [showElement, setShowElement] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 5000);
  }, []);

  const onPressBtn = () => {
    setShowInfos(!showInfos);
  };

  if (qrCode.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>
            Qr Code de {pseudo}
          </Text>
          {showElement ? (
            <Image
              source={{uri: qrCode[0].qr_code}}
              style={{
                marginTop: 20,
                width: 300,
                height: 300,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                marginRight: 'auto',
                marginLeft: 'auto',
                padding: 10,
                borderRadius: 8,
                marginTop: 30,
              }}>
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                Merci d'avoir scanné le QR Code, vous pouvez à présent entrer
                dans la salle sécurisée.
              </Text>
            </View>
          )}
        </View>
        {!showInfos && showElement && (
          <View style={{margin: 30, position: 'absolute', bottom: 5, left: 5}}>
            <TouchableOpacity onPress={onPressBtn}>
              <View>
                <FontAwesomeIcon icon={faCircleInfo} size={40} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {showInfos && showElement && (
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 8,
              padding: 10,
              marginTop: 40,
              position: 'absolute',
              bottom: 10,
              left: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '80%'}}>
                <Text>
                  Veuillez scanner votre QR code pour entrer dans la salle
                  sécurisée afin de récupérer votre équipement.
                </Text>
              </View>
              <TouchableOpacity
                style={{marginBottom: 5, alignItems: 'flex-end'}}
                onPress={onPressBtn}>
                <View>
                  <FontAwesomeIcon icon={faXmark} size={20} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  },
  content: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrCode;
