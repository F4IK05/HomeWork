import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Fontisto, Octicons } from '@expo/vector-icons';

export const SearchBar = () => (
    <View style={styles.searchContainer}>
        <Fontisto style={styles.searchIcon} name="search" size={18} color="#3480EB" />
        <TextInput 
            style={styles.searchInput} 
            placeholder="Search for milk, yogurt..." 
            placeholderTextColor={"#636368"} 
        />
        <TouchableOpacity style={styles.filterIcon}>
            <Octicons name="sliders" size={20} color="#636368" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 56,
        paddingHorizontal: 15,
    },
    searchIcon: { marginRight: 10 },
    searchInput: {
        flex: 1,
        fontFamily: 'Jakarta-Medium',
        fontSize: 16,
    },
    filterIcon: { marginLeft: 10 },
});