import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { AuthService } from '@/services/authService';
import { Image } from 'expo-image';

interface UserData {
    name: string;
    surname: string;
    avatarUrl?: string; 
}

export const HomeHeader = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await AuthService.getMe();
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [])

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Image style={styles.avatar} source={{ uri: user?.avatarUrl }} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.greetings}>Good Morning.</Text>
                    {loading ? (
                        <ActivityIndicator size="small" color="#3480EB" style={{ alignSelf: 'flex-start' }} />
                    ) : (
                        <Text style={styles.userName}>
                            {user ? `${user.name} ${user.surname}` : "Guest User"}
                        </Text>
                    )}
                </View>
            </View>

            <TouchableOpacity>
                <MaterialIcons name="notifications-none" size={26} color="#636368" style={styles.notificationsIcon} />
                <View style={styles.notificationsDot} />
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 15,
    },
    greetings: {
        fontSize: 12,
        fontFamily: "Jakarta-SemiBold",
        color: '#6E6E73',
    },
    userName: {
        fontSize: 15,
        fontFamily: "Jakarta-Bold",
    },
    notificationsIcon: {
        padding: 6,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    notificationsDot: {
        position: 'absolute',
        right: 7,
        top: 7,
        backgroundColor: '#FF3B30',
        width: 9,
        height: 9,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
});