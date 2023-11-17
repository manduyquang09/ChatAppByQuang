
import React, { useEffect } from 'react';
import {
  View,
} from 'react-native';
import Register from './src/screens/auth/Register';
import Login from './src/screens/auth/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
const Stack = createNativeStackNavigator()

const App = () => {
  const login = useSelector((state) => state.user.login);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {login ? (
          <Stack.Screen
            name="App"
            component={AppStack}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
