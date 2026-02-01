import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router";

export const CartHeader = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.roundButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Your Milk Basket</Text>
            <TouchableOpacity>
                <Text style={styles.clearText}>Clear</Text>
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
        justifyContent: "center",
        alignItems: "center",
    },
    clearText: {
        fontSize: 16,
        fontFamily: "Jakarta-Bold",
        color: "#3480EB"
    }
});