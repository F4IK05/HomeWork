import { CartResponse } from '@/types/cart';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const CartSummary = ({ subtotal, cart }: { subtotal: number, cart: CartResponse | null }) => {
    const isEmpty = !cart || cart.items.length === 0;
    const deliveryFee = isEmpty ? 0 : 1.00;

    const grandTotal = subtotal + deliveryFee;

    return (
        <View style={styles.container}>
            {!isEmpty && (

                <View style={styles.summaryBox}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Subtotal</Text>
                        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Delivery Fee</Text>
                        <Text style={[styles.value, { color: '#3480EB' }]}>${deliveryFee.toFixed(2)}</Text>
                    </View>
                </View>
            )}

            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerLabel}>GRAND TOTAL</Text>
                    <Text style={styles.footerPrice}>${grandTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={[styles.checkoutBtn, isEmpty && { backgroundColor: "#d7d7d7" }]}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 10
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    subHint: {
        fontSize: 13,
        fontFamily: 'Jakarta-Medium',
        color: '#94A3B8'
    },
    summaryBox: {
        position: 'relative',
        bottom: 135,
        padding: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 24
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    label: {
        fontSize: 15,
        color: '#94A3B8',
        fontFamily: 'Jakarta-Medium'
    },
    value: {
        fontSize: 15,
        color: '#1A1A1A',
        fontFamily: 'Jakarta-Bold'
    },
    totalLabel: {
        fontSize: 18,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    totalValue: {
        fontSize: 18,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
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
        borderTopColor: '#F1F5F9'
    },
    footerLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontFamily: 'Jakarta-Bold'
    },
    footerPrice: {
        fontSize: 22,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
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
        elevation: 4,
        shadowColor: '#3480EB',
        shadowOpacity: 0.3,
        shadowRadius: 10
    },
    checkoutText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Jakarta-Bold'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    emptyText: {
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'Jakarta-Medium',
        color: '#94A3B8'
    },
    shopBtn: {
        marginTop: 30,
        backgroundColor: '#3480EB',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15
    },
    shopBtnText: {
        color: 'white',
        fontFamily: 'Jakarta-Bold'
    }
});