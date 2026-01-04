import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { getCart, removeFromCart, clearCart } from "@/src/storage/cartStorage";
import { useFocusEffect } from "expo-router";

type CartItem = {
    id: number;
    title: string;
    price: number;
    image: any;
    size: "S" | "M" | "L";
    qty: number;
};

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setItems(data);
        } finally {
            setLoading(false);
        }
    };

    // чтобы при фокусе экрана
    useFocusEffect(
        useCallback(
          () => { 
            load();
          }, [])
      );

    useEffect(() => {
        load();
    }, []);

    const total = useMemo(() => {
        return items.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0);
    }, [items]);

    const onRemove = (item: CartItem) => {
        Alert.alert("Remove", `Remove ${item.title} (${item.size}) from cart?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: async () => {
                    await removeFromCart(item.id, item.size);
                    load();
                },
            },
        ]);
    };

    const onClear = () => {
        if (items.length === 0) return;

        Alert.alert("Clear cart", "Remove all items from cart?", [
            { text: "Cancel" },
            {
                text: "Clear",
                onPress: async () => {
                    await clearCart();
                    load();
                },
            },
        ]);
    };

    const renderItem = ({ item }: { item: CartItem }) => {

        return (
            <View style={styles.card}>
                <View style={styles.cardLeft}>
                    <Image source={item.image} style={styles.image} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.title}
                        </Text>

                        <View style={styles.metaRow}>
                            <View style={styles.pill}>
                                <Text style={styles.pillText}>{item.size}</Text>
                            </View>
                            <Text style={styles.metaText}>Quantity: {item.qty}</Text>
                        </View>

                        <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item)}>
                    <Ionicons name="trash-outline" size={20} color="#D17842" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient colors={["#192438", "#313139"]} style={styles.bg}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Cart</Text>

                    <TouchableOpacity style={styles.headerBtn} onPress={onClear}>
                        <Text style={styles.headerBtnText}>Clear</Text>
                    </TouchableOpacity>
                </View>

                {loading ? (
                    <View style={styles.center}>
                        <Text style={{ color: "#C9CCD3" }}>Loading...</Text>
                    </View>
                ) : items.length === 0 ? (
                    <View style={styles.center}>
                        <Ionicons name="cart-outline" size={42} color="#52555A" />
                        <Text style={styles.emptyTitle}>Your cart is empty</Text>
                        <Text style={styles.emptySub}>Add items from the Coffee list</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={items}
                            keyExtractor={(i) => `${i.id}-${i.size}`}
                            renderItem={renderItem}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />

                        <View style={styles.footer}>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                            </View>

                            <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
                                <Text style={styles.checkoutText}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#0E141E" },
    bg: { flex: 1 },

    header: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }, 
    headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
    headerBtn: {
        padding: 16,
        borderRadius: 30,
        backgroundColor: "#171C26",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#252A32",
    },
    headerBtnText: {
        color: "#f93d3dff",
        fontWeight: "700"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    emptyTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginTop: 10,
    },
    emptySub: {
        color: "#AEB2B9",
        fontSize: 13,
        marginTop: 6,
        textAlign: "center",
    },

    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 140, // чтобы не перекрывалось footer
        gap: 12,
    },

    card: {
        backgroundColor: "#171C26",
        borderRadius: 18,
        padding: 12,
        borderWidth: 1,
        borderColor: "#252A32",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    image: {
        width: 62,
        height: 62,
        borderRadius: 14,
        resizeMode: "contain",
        backgroundColor: "rgba(255,255,255,0.03)",
    },

    title: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
    metaText: { color: "#AEB2B9", fontSize: 12 },

    pill: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: "#11161F",
        borderWidth: 1,
        borderColor: "#1C222E",
    },
    pillText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

    price: { color: "#D17842", fontSize: 13, fontWeight: "800", marginTop: 6 },

    removeBtn: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: "#11161F",
        borderWidth: 1,
        borderColor: "#1C222E",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },

    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 80,
        backgroundColor: "rgba(20, 20, 20, 0.35)",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    totalLabel: { color: "#AEB2B9", fontSize: 13, fontWeight: "600" },
    totalValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },

    checkoutBtn: {
        height: 58,
        borderRadius: 18,
        backgroundColor: "#8B4C1F",
        alignItems: "center",
        justifyContent: "center",
    },
    checkoutText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
