import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { me } from "@/src/api/authService";

type MeDto = {
    email?: string;
    username?: string;
    pictureUrl?: string;
};

export default function AddressPage() {
    const [user, setUser] = useState<MeDto | null>(null);

    const loadMe = async () => {
        const data = await me();
        setUser(data);
    };

    useEffect(() => {
        loadMe();
    }, []);

    const displayName = user?.username;
    const phone = "+9191000000000000";

    const MENU = [
        {
            key: "town",
            title: "Town",
            subtitle: "New city town",
            icon: "location-outline",
        },
        {
            key: "name",
            title: displayName,
            subtitle: displayName,
            icon: "person-outline",
        },
        {
            key: "phone",
            title: "Call/Phone",
            subtitle: phone,
            icon: "call-outline",
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#192438", "#313139"]} style={styles.background}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Address</Text>
                </View>

                <View style={styles.list}>
                    {MENU.map((item) => (
                        <TouchableOpacity
                            key={item.key}
                            style={styles.row}
                            activeOpacity={0.75}
                        >
                            <View style={styles.leftIcon}>
                                <Ionicons name={item.icon} size={22} color="#D17842" />
                            </View>

                            <View style={styles.textBox}>
                                <Text style={styles.title}>{item.title}</Text>
                                {!!item.subtitle && (
                                    <Text style={styles.subtitle} numberOfLines={1}>
                                        {item.subtitle}
                                    </Text>
                                )}
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color="rgba(255,255,255,0.55)"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0E141E" },
    background: { flex: 1 },

    header: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        position: "relative",
    },
    headerTitle: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "500",
    },

    backBtn: {
        position: "absolute",
        left: 18,
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: "#171C26",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#252A32",
    },


    centerBox: { flex: 1, alignItems: "center", justifyContent: "center" },

    list: {
        paddingTop: 10,
        paddingHorizontal: 18,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
    },

    leftIcon: {
        width: 34,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    textBox: {
        flex: 1,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
    },

    subtitle: {
        marginTop: 4,
        color: "rgba(255,255,255,0.45)",
        fontSize: 13,
    },
});
