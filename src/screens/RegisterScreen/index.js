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
    fullName: 'Usman ghani',
    email: 'usmanghanidev12322@gmail.com',
    password: 'usman123737',
    dateOfBirth: '22-2-201',
  });

  const { functions } = authContext();

  const { handleRegister } = functions;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header />

        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Full Name</Label>
              <Input
                placeholder="jhon doe"
                value={state.fullName}
                onChangeText={(email) => setState({ ...state, fullName })}
              />
            </Item>

            <Item fixedLabel>
              <Label>Email</Label>
              <Input
                placeholder="ex@gmail.com"
                value={state.email}
                onChangeText={(email) => setState({ ...state, email })}
              />
            </Item>

            <Item fixedLabel>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                value={state.password}
                onChangeText={(password) => setState({ ...state, password })}
              />
            </Item>

            <Item fixedLabel last>
              <Label>Date Of Birth</Label>
              <Input
                placeholder="Password"
                value={state.dateOfBirth}
                onChangeText={(password) => setState({ ...state, dateOfBirth })}
              />
            </Item>

            <View
              style={{
                marginTop: 20,
              }}>
              <Button onPress={() => handleRegister(state)}>
                <Text>Register</Text>
              </Button>
            </View>
          </Form>

          <View>
            <Text onPress={() => navigation.navigate('Login')}>Login Page</Text>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
}
