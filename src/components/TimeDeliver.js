// TimeDeliver.js
import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

const TimeDeliver = ({ timestamp }) => {
    return (
        <View style={{ marginBottom: 8 }}>
            <View style={{ backgroundColor: '#e4e6eb', borderRadius: 10, width: "40%" }}>
                <Text style={{ fontSize: 12, color: '#65676b' }}>{moment(timestamp).format('HH:mm')}</Text>
            </View>
        </View>
    );
};

export default TimeDeliver;
