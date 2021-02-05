import * as React from 'react';
import { View, Text } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ background: 'coral', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register</Text>
      <Text onPress={() => navigation.navigate('Login')}>Login</Text>
    </View>
  );
}
