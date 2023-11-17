import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
const Home = () => {
    const userList = useSelector((state) => state.userList.userList)
    useEffect(() => {
        console.log(userList)

    }, [])
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home