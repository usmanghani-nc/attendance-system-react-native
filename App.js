import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './RootNavigation';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

// SCREENS ...//
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Context ...//
import AuthContext, { authContext } from './src/context/AuthContext';
import AttendanceContext from './src/context/AttendanceContext';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
  const { state } = authContext();

  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      }))();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {state.isLogin ? (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#fff',
            activeBackgroundColor: '#0083ff',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ size, color }) => (
                <MaterialCommunityIcons name="home-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              tabBarIcon: ({ size, color }) => (
                <MaterialCommunityIcons name="details" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ size, color }) => (
                <SimpleLineIcons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
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
    <AttendanceContext>
      <AuthContext>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </AuthContext>
    </AttendanceContext>
  );
}
