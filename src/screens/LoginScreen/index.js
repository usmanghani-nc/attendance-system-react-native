import React, { useState } from 'react';
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  View,
  Icon,
  Spinner,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authContext } from '../../context/AuthContext';
import { validateEmail } from '../../functions/emailValidate';

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: 'usmanghanidev12322@gmail.com',
    password: 'usman123737',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const { state: authState, functions } = authContext();

  const { handleLogin } = functions;

  const handleSubmit = (e) => {
    if (!validateEmail(state.email)) {
      setError({
        ...error,
        email: 'Email invalid',
        password: '',
      });
    } else if (!state.password) {
      setError({
        ...error,
        email: '',
        password: 'Password Empty',
      });
    } else {
      setError({
        ...error,
        email: '',
        password: '',
      });
      handleLogin(state);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ marginLeft: 10, marginRight: 10 }}>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          {authState.error ? (
            <View style={{ marginBottom: 20, marginLeft: 14 }}>
              <Text style={{ color: 'red', fontSize: 16 }}>{authState.error}</Text>
            </View>
          ) : null}

          <Form>
            <Item fixedLabel style={{ marginBottom: 10 }} error={!!error.email}>
              <Label>Email</Label>
              <Input
                placeholder="ex@gmail.com"
                value={state.email}
                onChangeText={(email) => setState({ ...state, email })}
              />

              {error.email ? <Icon name="close-circle" /> : null}
            </Item>

            {error.email ? (
              <View style={{ marginBottom: 5, marginTop: 5, marginLeft: 16 }}>
                <Text style={{ fontSize: 14, color: 'red' }}>{error.email}</Text>
              </View>
            ) : null}

            <Item fixedLabel last error={!!error.password}>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                value={state.password}
                onChangeText={(password) => setState({ ...state, password })}
              />
              {error.password ? <Icon name="close-circle" /> : null}
            </Item>
            {error.password ? (
              <View style={{ marginBottom: 5, marginTop: 5, marginLeft: 16 }}>
                <Text style={{ fontSize: 14, color: 'red' }}>{error.password}</Text>
              </View>
            ) : null}
            <View
              style={{
                marginTop: 20,
              }}>
              <Button
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
                onPress={handleSubmit}>
                {authState.loading ? (
                  <Spinner color="white" />
                ) : (
                  <Text style={{ textAlign: 'center', width: '100%' }}>Login</Text>
                )}
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
