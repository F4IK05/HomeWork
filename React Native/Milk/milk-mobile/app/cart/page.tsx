import { CartHeader } from "@/components/screen/cart/CartHeader";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartPage() {
    return (
        <SafeAreaView style={styles.container}>
            <CartHeader />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
})