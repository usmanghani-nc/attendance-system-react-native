import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

      <Text onPress={() => navigation.navigate('Details')}>Detail screen</Text>
    </View>
  );
}
