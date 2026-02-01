import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types/product";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;

export const ProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)} activeOpacity={0.8} style={styles.card}>
        <View style={styles.imageContainer}>
            <View style={styles.volumeBadge}>
                <Text style={styles.volumeText}>{item.volume}</Text>
            </View>
            <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.image} 
            />
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={1}>{item.description}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({

    card: {
        width: ITEM_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginHorizontal: 8,
        padding: 12,
    },
    imageContainer: {
        width: '100%',
        height: 140,
        backgroundColor: '#F8FAFC',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    volumeBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    volumeText: {
        fontSize: 10,
        fontFamily: 'Jakarta-Bold',
        color: '#64748B'
    },

    infoContainer: {
        marginTop: 12
    },
    title: {
        fontSize: 15,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A',
        height: 40
    },
    description: {
        fontSize: 12,
        fontFamily: 'Jakarta-Medium',
        color: '#94A3B8',
        marginTop: 4
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    price: {
        fontSize: 16,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    addButton: {
        backgroundColor: '#3480EB',
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});