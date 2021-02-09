import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../RootNavigation';

export const Context = React.createContext();

export const authContext = () => useContext(Context);

export default function Auth(props) {
  const [state, setState] = useState({
    isLogin: false,
    error: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setState({ ...state, isLogin: true });
      } else {
        setState({ ...state, isLogin: false });
      }
    };

    checkToken();
  }, [state.isLogin]);

  //   Actions...
  const handleLogin = async ({ email, password }) => {
    if (!email || !password) return;

    try {
      const { data } = await axios.post('https://c8513a3b024e.ngrok.io/login', { email, password });

      console.log(data, '??');
      if (data.status === 'ok') {
        setState({ ...state, isLogin: true });

        await AsyncStorage.setItem('token', data.data);
      } else {
        setState({ ...state, error: data });
      }
    } catch (err) {
      console.log(err.message, 'ERR');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setState({ ...state, isLogin: false });
    RootNavigation.navigate('Login');
  };

  const handleRegister = async ({ fullName, email, password, dateOfBirth }) => {
    if (!fullName && !email && !password && !dateOfBirth) return;

    try {
      const { data } = await axios.post('https://c8513a3b024e.ngrok.io/register', {
        fullName,
        email,
        password,
        dateOfBirth,
      });

      if (data.register) RootNavigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Context.Provider
      value={{ state: { ...state }, functions: { handleLogin, handleLogout, handleRegister } }}>
      {props.children}
    </Context.Provider>
  );
}
