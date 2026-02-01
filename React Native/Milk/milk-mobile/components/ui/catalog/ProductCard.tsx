import { router } from "expo-router";
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 50) / 2;

export const ProductCard = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)} style={styles.productCard}>
        <View style={[styles.imageContainer, { backgroundColor: item.bgColor || '#F8F9FB' }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#3480EB" />
            </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{item.title.split(' ')[0]} Fresh</Text>
            <Text style={styles.productSub}>{item.title} • {item.volume}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({

    productCard: {
        width: COLUMN_WIDTH,
        marginBottom: 20
    },
    imageContainer: {
        width: '100%',
        height: 180,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    productImage: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain'
    },
    addButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#FFF',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    productInfo: {
        marginTop: 10
    },
    productTitle: {
        fontSize: 16,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    productSub: {
        fontSize: 12,
        fontFamily: 'Jakarta-Medium',
        color: '#94A3B8',
        marginTop: 2
    },
    productPrice: {
        fontSize: 18,
        fontFamily: 'Jakarta-Bold',
        color: '#3480EB',
        marginTop: 5
    }
});