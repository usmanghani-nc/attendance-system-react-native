import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../RootNavigation';
import trackAPI from '../api';

export const Context = React.createContext();

export const authContext = () => useContext(Context);

export default function Auth(props) {
  const [state, setState] = useState({
    isLogin: false,
    error: false,
    loading: true,
    user: false,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const { data } = await trackAPI.get('/checkUser');
        setState({ ...state, isLogin: true, user: data.data, loading: false });
      } else {
        setState({ ...state, isLogin: false, loading: false });
      }
    };

    checkToken();
  }, [state.isLogin]);

  //   Actions...
  const handleLogin = async ({ email, password }) => {
    setState({ ...state, error: false, loading: true });

    if (!email || !password) return;

    try {
      const { data } = await trackAPI.post(`/login`, { email, password });

      if (data.status === 'ok') {
        setState({ ...state, isLogin: true, loading: false });
        await AsyncStorage.setItem('token', data.data);
      } else {
        setState({ ...state, error: data.data, loading: false });

        return;
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
    setState({ ...state, error: false, loading: true });

    if (!fullName && !email && !password && !dateOfBirth) return;

    try {
      const { data } = await trackAPI.post(`/register`, {
        fullName,
        email,
        password,
        dateOfBirth,
      });

      if (data.register) RootNavigation.navigate('Login');

      setState({ ...state, error: false, loading: false });
    } catch (err) {
      console.log(err, '??err??');
    }
  };

  return (
    <Context.Provider
      value={{ state: { ...state }, functions: { handleLogin, handleLogout, handleRegister } }}>
      {props.children}
    </Context.Provider>
  );
}
