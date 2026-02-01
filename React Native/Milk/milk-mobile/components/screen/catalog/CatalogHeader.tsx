import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons';


export const CatalogHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Fresh Milk</Text>
            <TouchableOpacity style={styles.cartButton}>
                <Feather name="shopping-cart" size={22} color="#3480EB" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 15
    },
    headerTitle: { 
        fontSize: 28, 
        fontFamily: 'Jakarta-Bold', 
        color: '#1A1A1A' 
    },
    cartButton: {
        width: 45,
        height: 45,
        backgroundColor: '#F0F7FF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
})