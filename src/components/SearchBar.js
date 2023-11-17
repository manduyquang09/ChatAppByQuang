import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../Constant/Color';
const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };


    return (
        <View style={styles.container}>
            <Icon name="search" size={20} color={COLORS.Icon} />
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onSubmitEditing={handleSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        padding: 5,
        width: "90%",
        marginLeft: '2%'
        ,
        marginVertical: 10,
    },
    input: {
        height: 40,
        paddingLeft: 10,
        fontSize: 16
    },
});

export default SearchBar;
