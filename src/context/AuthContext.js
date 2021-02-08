import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = React.createContext();

export const authContext = () => useContext(Context);

export default function Auth(props) {
  const [state, setState] = useState({
    isLogin: false,
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
      const {
        data: { data: token },
      } = await axios.post('https://b73a34dc2b1b.ngrok.io/login', { email, password });

      if (token) {
        setState({ ...state, isLogin: true });

        console.log(token);
        await AsyncStorage.setItem('token', token);
      }
    } catch (err) {
      console.log(err.message, 'ERR');
    }
  };

  return (
    <Context.Provider value={{ state: { ...state }, functions: { handleLogin } }}>
      {props.children}
    </Context.Provider>
  );
}
