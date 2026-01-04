import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const PAYMENT_METHODS = [
    { id: "visa", label: "Visa", icon: require("@/assets/images/visa.png") },
    { id: "mastercard", label: "Mastercard", icon: require("@/assets/images/master-card.png") },
    { id: "applepay", label: "Apple Pay", icon: require("@/assets/images/apple-pay.png") },
    { id: "googlepay", label: "Google Pay", icon: require("@/assets/images/google-pay.png") },
];

export default function PaymentMethodPage() {
    const [selectedId, setSelectedId] = useState("visa");

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#192438", "#313139"]} style={styles.background}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment Method</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Payment</Text>
                        <TouchableOpacity style={styles.addCardButton}>
                            <Ionicons name="add-circle-outline" size={20} color="#D17842" />
                            <Text style={styles.addCardText}>Add your card</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.list}>
                        {PAYMENT_METHODS.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.card,
                                    selectedId === method.id && styles.cardSelected
                                ]}
                                onPress={() => setSelectedId(method.id)}
                            >
                                <Image
                                    source={method.icon}
                                    style={styles.cardLogo}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E141E",
    },
    background: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: "#171C26",
        borderWidth: 1,
        borderColor: "#252A32",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
        opacity: 0.9,
    },
    addCardButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    addCardText: {
        color: "#8E949A",
        fontSize: 14,
    },
    list: {
        gap: 16,
    },
    card: {
        backgroundColor: "#171C26",
        height: 100,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    cardSelected: {
        borderColor: "#D17842",
    },
    cardLogo: {
        width: 100,
        height: 40,
    },
    footer: {
        padding: 20,
        paddingBottom: 30,
    },
    primaryButton: {
        backgroundColor: "#D17842",
        borderRadius: 20,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#D17842",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});