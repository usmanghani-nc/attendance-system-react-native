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
    fullName: 'Usman ghani',
    email: 'usmanghanidev12322@gmail.com',
    password: 'usman123737',
    dateOfBirth: '22-2-201',
  });

  const [error, setError] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });

  const { state: authState, functions } = authContext();

  const { handleRegister } = functions;

  const handleSubmit = (e) => {
    if (!state.fullName.length) {
      setError({
        ...error,
        fullName: 'Input Empty',
        email: '',
        password: '',
        dateOfBirth: '',
      });
    } else if (!validateEmail(state.email)) {
      setError({
        ...error,
        fullName: '',
        email: 'Email invalid',
        password: '',
        dateOfBirth: '',
      });
    } else if (!state.password || state.password.length < 7) {
      setError({
        ...error,
        fullName: '',
        email: '',
        password:
          state.password.length < 1
            ? 'Password Empty'
            : 'Password must be more then 6 characters long',
        dateOfBirth: '',
      });
    } else if (!state.dateOfBirth) {
      setError({
        ...error,
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: 'Date of birth is empty',
      });
    } else {
      setError({
        ...error,
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: '',
      });

      handleRegister(state);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ marginLeft: 10, marginRight: 10 }}>
        <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <Form>
            <Item fixedLabel error={!!error.fullName}>
              <Label>Full Name</Label>
              <Input
                placeholder="jhon doe"
                value={state.fullName}
                onChangeText={(fullName) => setState({ ...state, fullName })}
              />
              {error.fullName ? <Icon name="close-circle" /> : null}
            </Item>
            {error.fullName ? (
              <View style={{ marginBottom: 5, marginTop: 5, marginLeft: 16 }}>
                <Text style={{ fontSize: 14, color: 'red' }}>{error.fullName}</Text>
              </View>
            ) : null}

            <Item fixedLabel error={!!error.email}>
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

            <Item fixedLabel error={!!error.password}>
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

            <Item fixedLabel last error={!!error.dateOfBirth}>
              <Label>Date Of Birth</Label>
              <Input
                placeholder="Date Of Birth"
                value={state.dateOfBirth}
                onChangeText={(dateOfBirth) => setState({ ...state, dateOfBirth })}
              />
              {error.dateOfBirth ? <Icon name="close-circle" /> : null}
            </Item>

            {error.dateOfBirth ? (
              <View style={{ marginBottom: 5, marginTop: 5, marginLeft: 16 }}>
                <Text style={{ fontSize: 14, color: 'red' }}>{error.dateOfBirth}</Text>
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
                  <Text style={{ textAlign: 'center', width: '100%' }}>Register</Text>
                )}
              </Button>
            </View>
          </Form>

          <View
            style={{
              marginTop: 20,
            }}>
            <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Login')}>
              Login Page
            </Text>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
}
