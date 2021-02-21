import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { attendanceContext } from '../../context/AttendanceContext';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
const initState = {
  hasePermission: null,
  location: {},
  error: false,
  isLoading: true,
};

export default function HomeScreen({ navigation }) {
  const [state, setState] = useState(initState);
  const [scanned, setScanned] = useState(false);

  const {
    state: contextState,
    functions: { handleCheckIn, resetErr },
  } = attendanceContext();

  // Rests state when screen focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', (e) => {
      setState({ ...initState });
    });

    return unsubscribe;
  }, [navigation]);

  // Take camera permistion
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      if (status) setState({ ...state, hasePermission: state === 'granted' });
    })();
  }, [state.hasePermission]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setState({
          ...state,
          error: 'Permission to access location was denied',
          isLoading: false,
        });
      }

      const { coords } = await Location.getCurrentPositionAsync({});

      if (coords.latitude && coords.longitude) {
        setState({
          ...state,
          isLoading: false,
          location: coords,
        });
      }
    })();
  }, [state.isLoading]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const { deviceId } = Constants;

    const qrString = data;

    handleCheckIn({ qrString, deviceId, location: state.location });
  };

  if (state.hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (state.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (contextState.err) {
    Alert.alert(
      'Alert ',
      contextState.err,
      [
        {
          text: 'OK',
          onPress: () => {
            resetErr();
            setScanned(false);
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!state.isLoading ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
