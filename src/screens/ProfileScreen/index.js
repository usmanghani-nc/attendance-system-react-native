import React from 'react';
import { Button, Text, Card, Container } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../../context/AuthContext';

export default function AuthScreen({ navigation }) {
  const {
    state: authState,
    functions: { handleLogout },
  } = authContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.title}>Full Name</Text>
          <Text>{authState.user?.fullName}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.title}>Email</Text>
          <Text>{authState.user?.email}</Text>
        </Card>

        <Button info full onPress={handleLogout}>
          <Text>Logout</Text>
        </Button>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  card: {
    marginBottom: 15,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
