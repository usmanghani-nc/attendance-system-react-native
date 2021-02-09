import React, { useState } from 'react';
import {
  Container,
  Header,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  View,
} from 'native-base';
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
      <Container>
        <Header />

        <Content>
          <Form>
            <Item fixedLabel>
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
              <Button onPress={() => handleLogin(state)}>
                <Text>Login</Text>
              </Button>
            </View>
          </Form>

          <View>
            <Text onPress={() => navigation.navigate('Register')}>Register Page</Text>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
}
