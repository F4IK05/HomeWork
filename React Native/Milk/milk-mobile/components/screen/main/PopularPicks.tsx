import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProductCard } from '@/components/ui/main/ProductCard';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

interface PopularPicksProps {
    categorySlug: string;
}

// ДОБАВИТЬ SHUFFLE
export const PopularPicks = ({ categorySlug }: PopularPicksProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchProducts();
    }, [categorySlug])

    const fetchProducts = async () => {
        try {
            setLoading(true);

            // первые 10 товаров
            const response = await productService.getAll({ pageSize: 10, categorySlug: categorySlug || undefined });

            const shuffled = response.items.sort(() => 0.5 - Math.random());

            setProducts(shuffled);
        } catch (error){
            console.error("Error fetching popular picks: ", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color="#3480EB" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>{categorySlug ? `Results for ${categorySlug}` : "Popular Picks"}</Text>
                <TouchableOpacity onPress={fetchProducts}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>No products found</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25
    },
    loaderContainer: {
        marginTop: 50,
        alignItems: 'center'
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    seeAll: {
        fontSize: 14,
        fontFamily: 'Jakarta-SemiBold',
        color: '#3480EB'
    },
    listContent: {
        paddingBottom: 10
    },
    emptyText: {
        textAlign: 'center',
        color: '#94A3B8',
        fontFamily: 'Jakarta-Medium',
        marginTop: 20
    }
});