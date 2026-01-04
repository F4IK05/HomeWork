import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";

import { CoffeeData } from "@/app/data/coffee";
import { Coffee } from "@/app/types/coffee-data-types";
import { LinearGradient } from "expo-linear-gradient";

import { addToCart } from "@/src/storage/cartStorage";
import { isFavorite, toggleFavorite } from "@/src/storage/favoritesStorage";

type SizeKey = "S" | "M" | "L";

export default function CoffeeDetailsPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const coffee = useMemo(() => {
        const num = Number(id);
        return (CoffeeData as Coffee[]).find((x) => x.id === num) ?? null;
    }, [id]);

    const [size, setSize] = useState<SizeKey>("M");
    const [qty, setQty] = useState(1);
    const [fav, setFav] = useState(false);

    useEffect(() => {
        (async () => setFav(await isFavorite(coffee.id)))();
    }, [coffee.id]);

    if (!coffee) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>Coffee not found</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.backFromError}>
                    <Text style={{ color: "#fff" }}>Go back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
    const onAddToCart = async () => {
        await addToCart({
            id: coffee.id,
            title: coffee.title,
            price: coffee.price,
            image: (coffee as any).image,
            size,
            qty,
        });

        Alert.alert("Success", "Added to cart")
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient style={styles.container} colors={["#192438", "#313139"]}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>{coffee.title}</Text>

                    <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={async () => {
                            const newState = await toggleFavorite({
                                id: coffee.id,
                                title: coffee.title,
                                price: coffee.price,
                                image: coffee.image,
                                rating: coffee.rating,
                            });
                            setFav(newState);
                        }}
                    >
                        <Ionicons name={fav ? "heart" : "heart-outline"} size={24} color="#D17842" />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageSection}>
                    <Image source={coffee.image} style={styles.image} />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>Descriptions</Text>
                    <Text style={styles.descriptionText}>{coffee.description}</Text>

                    <View style={styles.sizeContainer}>
                        {(["S", "M", "L"] as SizeKey[]).map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setSize(item)}
                                style={[styles.sizeBox, size === item && styles.sizeBoxActive]}
                            >
                                <Text style={[styles.sizeText, size === item && styles.sizeTextActive]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.stepperWrapper}>

                        <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty((q) => Math.max(1, q - 1))}>
                            <Text style={styles.stepperBtnText}>-</Text>
                        </TouchableOpacity>

                        <View style={styles.stepperCapsule}>
                            <Text style={styles.qtyText}>{String(qty).padStart(2, "0")}</Text>
                        </View>

                        <TouchableOpacity style={styles.stepperBtn} onPress={() => setQty((q) => Math.min(q + 1, 5))}>
                            <Text style={styles.stepperBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8} onPress={onAddToCart}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                        <View style={styles.priceDivider} />
                        <Text style={styles.priceText}>${coffee.price.toFixed(2)}</Text>
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

    errorContainer: {
        flex: 1,
        backgroundColor: "#0E141E",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    errorText: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 14,
    },
    backFromError: {
        backgroundColor: "#171C26",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerBtn: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: "#171C26",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#252A32",
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
    },

    imageSection: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    image: {
        width: 260,
        height: 260,
        resizeMode: "contain",
        zIndex: 2,
    },

    infoContainer: {
        paddingHorizontal: 25,
        alignItems: "center",
        marginTop: 20,
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 12,
    },
    descriptionText: {
        color: "#AEB2B9",
        fontSize: 15,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 25,
    },

    sizeContainer: {
        flexDirection: "row",
        gap: 15,
        marginBottom: 30,
    },
    sizeBox: {
        width: 65,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#171C26",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#252A32",
    },
    sizeBoxActive: {
        backgroundColor: "#8B4C1F",
        borderColor: "#D17842",
    },
    sizeText: {
        color: "#AEB2B9",
        fontSize: 16,
        fontWeight: "600",
    },
    sizeTextActive: {
        color: "#FFFFFF",
    },

    stepperWrapper: {
        gap: 10,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    stepperBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#171C26",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#252A32",
    },

    stepperBtnText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "500",
    },
    stepperCapsule: {
        backgroundColor: "#11161F",
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#1C222E",
    },
    qtyText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 2,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 20,
    },
    addToCartBtn: {
        height: 64,
        borderRadius: 20,
        backgroundColor: "#8B4C1F",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 25,
    },
    addToCartText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },
    priceDivider: {
        width: 1,
        height: 24,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginHorizontal: 15,
    },
    priceText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },
});
