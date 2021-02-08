import React, { useState } from 'react';
import { Container, Header, Button, Content, Form, Item, Input, Label, Text } from 'native-base';
import { authContext } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: 'usmanghanidev@gmail.com',
    password: 'usman123737',
  });

  const { functions } = authContext();

  const { handleLogin } = functions;

  return (
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

          <Button onPress={() => handleLogin(state)}>
            <Text>Login</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}
