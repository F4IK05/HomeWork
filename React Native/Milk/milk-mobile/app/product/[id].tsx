import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ImageSection } from '@/components/screen/product/ImageSection';
import { DetailsSection } from '@/components/screen/product/DetailsSection';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';


export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);
    
    const fetchProduct = async () => {
        try {
            setLoading(true);

            const data = await productService.getById(id as string);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <ActivityIndicator size="large" color="#3480EB" />
            </SafeAreaView>
        );
    }
    
    if (!product) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text>Product not found</Text>
                <TouchableOpacity onPress={() => router.back()}><Text>Go Back</Text></TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <ImageSection product={product}/>
            <DetailsSection product={product}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});