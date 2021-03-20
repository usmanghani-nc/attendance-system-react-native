import React from 'react';
import { Image } from 'react-native';
import { Container } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ justifyContent: 'center' }}>
        <Image
          style={{ width: '100%', height: 200 }}
          source={require('../../../assets/loader.gif')}
        />
      </Container>
    </SafeAreaView>
  );
}
