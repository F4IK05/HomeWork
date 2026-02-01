import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';

export const LocationSelector = () => (
    <View style={styles.locationContainer}>
        <TouchableOpacity style={styles.location}>
            <Octicons name="location" size={15} color="#3480EB" />
            <Text style={styles.locationText}>Greenwood Apt, Block B</Text>
            <Octicons name="chevron-down" size={15} color="#3480EB" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    locationContainer: { flexDirection: 'row', marginTop: 15 },
    location: {
        backgroundColor: '#dae9ff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 13,
        borderRadius: 20,
    },
    locationText: {
        marginLeft: 8,
        marginRight: 4,
        fontSize: 12,
        fontFamily: "Jakarta-SemiBold",
        color: '#3480EB',
    },
});