import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo';
import { Ionicons } from '@expo/vector-icons';
// SCREENS ...//
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AuthScreen from './src/screens/AuthScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Context ...//
import AuthContext, { authContext } from './src/context/AuthContext';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
  const { state } = authContext();
  console.log(state, '??');

  useEffect(() => {
    const fontLoad = async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    };

    fontLoad();
  }, []);

  return (
    <NavigationContainer>
      {state.isLogin ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Details" component={DetailsScreen} />
          <Tab.Screen name="Auth" component={AuthScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function () {
  return (
    <AuthContext>
      <App />
    </AuthContext>
  );
}
