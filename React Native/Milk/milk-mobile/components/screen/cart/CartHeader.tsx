import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router";
import { useCart } from "@/context/CartContext";

export const CartHeader = ({ isEmpty }: {isEmpty: boolean}) => {
    const { clearCart } = useCart();

    const handleClear = () => {
        Alert.alert("Clear Basket", "Remove all items?", [
            { text: "Cancel" },
            { text: "Clear", style: 'destructive', onPress: clearCart }
        ]);
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.roundButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.text}>Your Milk Basket</Text>
            <TouchableOpacity onPress={handleClear} disabled={isEmpty}>
                <Text style={[styles.clearText, isEmpty && { color: '#CBD5E1' }]}>Clear</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 20,
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