import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

export const ProfileHeader = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.roundButton}>
                <Ionicons name="arrow-back" size={24} color="#667085" />
            </TouchableOpacity>
            <Text style={styles.text}>My Profile</Text>
            <TouchableOpacity style={styles.roundButton}>
                <Ionicons name="settings" size={24} color="#667085" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        fontFamily: "Jakarta-Bold",
        color: "#1A1A1A",
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F3F7FA",
        justifyContent: "center",
        alignItems: "center",
    },
});