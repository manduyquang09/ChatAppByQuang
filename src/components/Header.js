import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../Constant/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ userName }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.black}
                translucent={false}
            />
            <TouchableOpacity

                onPress={() => navigation.goBack()}
            >
                <Icon
                    name='chevron-left'
                    size={30}
                    color={COLORS.white}
                />
            </TouchableOpacity>
            <Image
                source={require("../Assets/halo-infinite.jpeg")}
                style={styles.avatar}
            />
            <Text style={styles.headerText}>{userName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: "#e850da",
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Header;
