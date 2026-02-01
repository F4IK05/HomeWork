import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SearchBar = () => (
    <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#ADC1D2" />
        <TextInput
            style={styles.searchInput}
            placeholder="Search brands or types..."
            placeholderTextColor="#ADC1D2"
        />
    </View>
);

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F7FA',
        marginHorizontal: 20,
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 20
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontFamily: 'Jakarta-Medium',
        fontSize: 15
    },
});