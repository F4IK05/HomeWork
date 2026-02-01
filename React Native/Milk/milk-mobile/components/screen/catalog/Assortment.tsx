import { ProductCard } from "@/components/ui/catalog/ProductCard"
import { data } from "@/constant/data/products"
import { productService } from "@/services/productService"
import { Product } from "@/types/product"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"

export const Assortment = () => {
    const [products, setProducts] = useState<Product[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true);

            // первые 10 товаров
            const response = await productService.getAll({ pageSize: 10 });

            const shuffled = response.items.sort(() => 0.5 - Math.random());

            setProducts(shuffled);
        } catch (error) {
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
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    loaderContainer: {
        marginTop: 50,
        alignItems: 'center'
    },
    row: {
        justifyContent: 'space-between'
    },
});