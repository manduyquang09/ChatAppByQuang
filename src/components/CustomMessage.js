// CustomMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../Constant/Color';
import TimeDeliver from './TimeDeliver';
import moment from 'moment';

const CustomMessage = ({ sender, item, key }) => {
    return (

        <View style={[styles.messContainer, sender ? styles.sender : styles.receiver]}>
            <View
                style={[styles.messageBox,

                sender ?
                    styles.senderBox : styles.receiverBox

                ]}
            >
                <Text style={{ color: sender ? COLORS.white : COLORS.black }}>{item.message}</Text>
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
