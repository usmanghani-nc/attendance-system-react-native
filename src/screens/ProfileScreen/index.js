import React from 'react';
import { Button, Text } from 'native-base';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../../context/AuthContext';

export default function AuthScreen({ navigation }) {
  const {
    functions: { handleLogout },
  } = authContext();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Button onPress={handleLogout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
