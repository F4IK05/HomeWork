import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MilkCoinsCard = () => {
    return (
        <LinearGradient
            colors={['#3480EB', '#1C59B0']}
            style={styles.card}
        >
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Octicons name="verified" size={24} color="white" />
                    <Text style={styles.logoText}>MILK COINS</Text>
                </View>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Gold Member</Text>
                </View>
            </View>

            <View>
                <Text style={styles.balanceValue}>2,450</Text>
                <Text style={styles.balanceLabel}>Points Balance</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: '70%' }]} />
                </View>
                <Text style={styles.footerText}>550 points until next reward</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 40,
        borderRadius: 24,
        padding: 24,
        width: '100%',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'Jakarta-ExtraBold'
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Jakarta-Bold'
    },
    balanceValue: {
        color: 'white',
        fontSize: 36,
        fontFamily: 'Jakarta-Bold'
    },
    balanceLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginTop: -4,
        fontFamily: 'Jakarta-Medium'
    },
    footer: {
        marginTop: 20,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 3,
    },
    footerText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontFamily: 'Jakarta-SemiBold'
    },
});

export default MilkCoinsCard;