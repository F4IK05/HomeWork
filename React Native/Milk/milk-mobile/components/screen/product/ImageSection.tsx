import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, Feather } from "@expo/vector-icons"
import { WaveDivider } from "@/components/ui/WaveDivider"
import { router } from "expo-router";
import { Product } from "@/types/product";

const { height } = Dimensions.get('window');

export const ImageSection = ({product}: { product: Product }) => {
    return (
        <View style={styles.imageSection}>
            <Image source={{ uri: product.imageUrl }} style={styles.mainImage} />

            <SafeAreaView style={styles.headerButtons}>
                <TouchableOpacity onPress={() => router.back()} style={styles.roundButton}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.roundButton}>
                    <Feather name="shopping-cart" size={22} color="#1A1A1A" />
                </TouchableOpacity>
            </SafeAreaView>

            <WaveDivider />
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageSection: {
        height: height * 0.45,
        backgroundColor: '#F3F7FA',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainImage: {
        width: '75%',
        height: '75%',
        resizeMode: 'contain',
        marginBottom: 20
    },
    headerButtons: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roundButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4
    }
});