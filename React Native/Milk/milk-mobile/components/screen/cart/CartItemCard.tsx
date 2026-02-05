import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types/cart";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const CartItemCard = ({ item }: { item: CartItem }) => {
    const { updateQty, removeItem, cart } = useCart();

    return (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{item.title} – {item.volume}</Text>
                <Text style={styles.price}>${item.unitPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.quantityControls}>
                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => item.quantity > 1 ? updateQty(item.id, item.quantity - 1) : removeItem(item.id)}
                >
                    <Ionicons name="remove" size={18} color="#1A1A1A" />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                    style={[styles.qtyBtn, { backgroundColor: '#3480EB' }]}
                    onPress={() => updateQty(item.id, item.quantity + 1)}
                >
                    <Ionicons name="add" size={18} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 18,
        backgroundColor: '#F3F7FA'
    },
    info: {
        flex: 1,
        marginLeft: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    price: {
        fontSize: 14,
        fontFamily:
            'Jakarta-Medium',
        color: '#94A3B8',
        marginTop: 4
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 14,
        padding: 4
    },
    qtyBtn: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowOpacity: 0.1
    },
    qtyText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontFamily: 'Jakarta-Bold'
    }
});