import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

const ListItem = ({ item, onPress }) => {
    useEffect(() => {
        console.log("tiem : " + JSON.stringify(item))
    }, [])
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                borderTopWidth: 1,
                padding: 10,

                alignItems: 'center'

            }}

        >
            <Image
                source={require("../Assets/halo-infinite.jpeg")}
                style={{
                    width: 70, height: 70,
                    borderRadius: 35,
                    marginRight: 10
                }}
            />
            <View>
                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 18,
                    }}
                >
                    {item.username}
                </Text>
                <Text
                    style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: 16,
                    }}
                    numberOfLines={1}
                >
                    {item.lastestMessage}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem