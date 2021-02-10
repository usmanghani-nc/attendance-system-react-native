import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'native-base';
import { attendanceContext } from '../../context/AttendanceContext';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function HomeScreen({ navigation }) {
  const [state, setState] = useState({
    hasePermission: null,
    scanned: false,
  });

  const {
    functions: { handleCheckIn },
  } = attendanceContext();

  // Take permission
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      if (status) setState({ ...state, hasePermission: state === 'granted' });
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setState({ ...state, scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log(data, 'DATA');
    handleCheckIn(data);
  };

  if (state.hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (state.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <BarCodeScanner
          onBarCodeScanned={state.scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <Text>Home Screen</Text>
        <Text onPress={() => navigation.navigate('Details')}>Detail screen</Text>
      </View>
    </SafeAreaView>
  );
}
