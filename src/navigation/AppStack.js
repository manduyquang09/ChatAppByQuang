import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import UserList from '../screens/User/UserList'
import SingleChat from '../screens/Home/SingleChat'
const Stack = createNativeStackNavigator()
const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='userList'
        >
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="userList"
                component={UserList}
            />
            <Stack.Screen
                component={SingleChat}
                name="singleChat"
            />
        </Stack.Navigator>
    );
};

export default AppStack