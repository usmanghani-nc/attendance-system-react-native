import React, { useState } from 'react';
import { Container, Button, Content, Form, Item, Input, Label, Text, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: 'usmanghanidev12322@gmail.com',
    password: 'usman123737',
  });

  const { functions } = authContext();

  const { handleLogin } = functions;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ marginLeft: 10, marginRight: 10 }}>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <Form>
            <Item fixedLabel style={{ marginBottom: 10 }}>
              <Label>Email</Label>
              <Input
                placeholder="ex@gmail.com"
                value={state.email}
                onChangeText={(email) => setState({ ...state, email })}
              />
            </Item>
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                value={state.password}
                onChangeText={(password) => setState({ ...state, password })}
              />
            </Item>

            <View
              style={{
                marginTop: 20,
              }}>
              <Button
                style={{
                  width: '100%',
                }}
                onPress={() => handleLogin(state)}>
                <Text style={{ textAlign: 'center', width: '100%' }}>Login</Text>
              </Button>
            </View>
          </Form>

          <View
            style={{
              marginTop: 20,
            }}>
            <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Register')}>
              Register Page
            </Text>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
}
