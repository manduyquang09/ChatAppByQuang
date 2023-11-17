import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
const Stack = createNativeStackNavigator()
const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                component={Login}
                name="Login"
            />
            <Stack.Screen
                component={Register}
                name="Register"
            />
        </Stack.Navigator>
    )
}

export default AuthStack