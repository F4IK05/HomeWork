import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useCart } from '@/context/CartContext';
import { CartItemCard } from '@/components/screen/cart/CartItemCard';
import { CartSummary } from '@/components/screen/cart/CartSummary';
import { CartHeader } from '@/components/screen/cart/CartHeader';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

export default function CartPage() {
    const { cart, loading } = useCart();
    
    // Определяем, пуста ли корзина
    const isEmpty = !cart || cart.items.length === 0;

    if (loading && !cart) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3480EB" />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <CartHeader isEmpty={isEmpty} />

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.itemsSection}>
                    {isEmpty ? (
                        <View style={styles.emptyContent}>
                            <View style={styles.emptyIconCircle}>
                                <Ionicons name="basket-outline" size={50} color="#CBD5E1" />
                            </View>
                            <Text style={styles.emptyText}>Your basket is empty</Text>
                            <TouchableOpacity onPress={() => router.push('/(tabs)')}>
                                <Text style={styles.browseLink}>Browse products</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        cart.items.map(item => (
                            <CartItemCard key={item.id} item={item} />
                        ))
                    )}
                </View>

            </ScrollView>

            <CartSummary subtotal={cart?.totalPrice || 0} cart={cart} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    scrollContent: {
        flexGrow: 1,
    },
    itemsSection: {
        paddingTop: 20,
        minHeight: 250, // Чтобы заглушка не "схлопывалась"
    },
    // Стили для пустой корзины внутри списка
    emptyContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    emptyText: {
        fontSize: 16,
        fontFamily: 'Jakarta-Medium',
        color: '#94A3B8',
    },
    browseLink: {
        marginTop: 10,
        color: '#3480EB',
        fontFamily: 'Jakarta-Bold',
        fontSize: 15,
    },
    // Футер
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 25,
        paddingBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    footerLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontFamily: 'Jakarta-Bold',
        letterSpacing: 0.5,
    },
    footerPrice: {
        fontSize: 24,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A',
        marginTop: 2,
    },
    checkoutBtn: {
        flex: 1,
        marginLeft: 30,
        backgroundColor: '#3480EB',
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledBtn: {
        backgroundColor: '#CBD5E1', // Серый цвет для неактивной кнопки
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Jakarta-Bold'
    },
});