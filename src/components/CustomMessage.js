// CustomMessage.js
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS } from '../Constant/Color';
import TimeDeliver from './TimeDeliver';
import moment from 'moment';

const CustomMessage = ({ sender, item, key }) => {
    console.log("message" + JSON.stringify(item.message))
    return (

        <View style={[styles.messContainer, sender ? styles.sender : styles.receiver]}>
            <View
                style={[styles.messageBox,

                sender ?
                    styles.senderBox : styles.receiverBox

                ]}
            >
                {item.type === "text" ? (
                    <Text style={{ color: sender ? COLORS.white : COLORS.black }}>{item.message}</Text>

                ) : (
                    <Image
                        source={{ uri: encodeURIComponent(item.message) }}
                        style={{
                            height: 150,
                            width: 150,
                            resizeMode: 'cover',
                            borderRadius: 5,
                        }}
                    />
                )}
                {/* {!sender ? <TimeDeliver /> : null} */}
            </View>

        </View >

    );
};

const styles = StyleSheet.create({
    messContainer: {
        marginBottom: 5,
        //backgroundColor: "blue",
        flexDirection: 'column',
        //  alignItems: sender ? "flex-end" : "flex-start"


    },
    sender: {
        alignItems: 'flex-end'


    },
    receiver: {
        alignItems: 'flex-start'
    },
    messageBox: {
        borderRadius: 20,
        padding: 8,
        maxWidth: "50%"


    },
    senderBox: {
        backgroundColor: '#1877f2',

    },
    receiverBox: {
        backgroundColor: '#ffffff',

    },
});

export default CustomMessage;
