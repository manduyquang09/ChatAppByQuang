import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function InputField({

    label,
    icon,
    keyboardType,
    value,
    onChangeValue

}) {
    return (
        <View
            style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingBottom: 8,
                marginBottom: 25,

            }}
        >
            {icon}
            {label == 'password' ? (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    value={value}
                    onChangeText={onChangeValue}
                    secureTextEntry={true}
                />
            ) : (

                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    value={value}
                    onChangeText={onChangeValue}
                />
            )}
        </View>
    )
}