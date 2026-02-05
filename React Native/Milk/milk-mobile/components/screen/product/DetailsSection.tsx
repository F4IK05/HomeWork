import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

const { width } = Dimensions.get('window');

export const DetailsSection = ({product}: {product: Product}) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            await addToCart(product.id, quantity);
            
            Alert.alert(
                "Success", 
                `${product.title} (${quantity} units) added to your basket!`
            );
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to add item to cart";
            Alert.alert("Error", message);
        } finally {
            setIsAdding(false);
        }
    };
    
    return (
        <View style={styles.detailsSection}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.titleRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.productTitle}>{product.title}</Text>
                        <Text style={styles.subText}>{product.volume} • {product.categoryName}</Text>
                    </View>
                    <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <MaterialCommunityIcons name="egg-outline" size={24} color="#3480EB" />
                        <Text style={styles.statValue}>8g</Text>
                        <Text style={styles.statLabel}>PROTEIN</Text>
                    </View>
                    <View style={styles.statBox}>
                        <MaterialCommunityIcons name="bone" size={24} color="#3480EB" />
                        <Text style={styles.statValue}>30%</Text>
                        <Text style={styles.statLabel}>CALCIUM</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Ionicons name="water-outline" size={24} color="#3480EB" />
                        <Text style={styles.statValue}>3.2%</Text>
                        <Text style={styles.statLabel}>FAT</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>About Product</Text>
                <Text style={styles.longDescription}>
                    {product.description}
                </Text>
            </ScrollView>

            <View style={styles.bottomActions}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
                        <Ionicons name="remove" size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
                        <Ionicons name="add" size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsSection: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 0
    },
    scrollContent: {
        padding: 25,
        paddingTop: 10
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    productTitle: {
        fontSize: 24,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    subText: {
        fontSize: 14,
        fontFamily: 'Jakarta-Medium',
        color: '#94A3B8',
        marginTop: 5
    },
    currentPrice: {
        fontSize: 24,
        fontFamily: 'Jakarta-Bold',
        color: '#3480EB'
    },

    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25
    },
    statBox: {
        width: (width - 80) / 3,
        height: 90,
        backgroundColor: '#F8FAFC',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9'
    },
    statValue: {
        fontSize: 16,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A',
        marginTop: 5
    },
    statLabel: {
        fontSize: 9,
        fontFamily: 'Jakarta-Bold',
        color: '#94A3B8'
    },

    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A',
        marginBottom: 10
    },
    longDescription: {
        fontSize: 14,
        fontFamily: 'Jakarta-Medium',
        color: '#64748B',
        lineHeight: 22
    },

    bottomActions: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 35,
        borderTopWidth: 1,
        borderColor: '#F1F5F9',
        backgroundColor: '#FFF'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F7FA',
        borderRadius: 20,
        padding: 5
    },
    qtyBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    qtyText: {
        marginHorizontal: 15,
        fontSize: 18,
        fontFamily: 'Jakarta-Bold'
    },
    addToCartBtn: {
        flex: 1,
        marginLeft: 15,
        height: 56,
        backgroundColor: '#3480EB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addToCartText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Jakarta-Bold'
    }
});