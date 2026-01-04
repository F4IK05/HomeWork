import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CoffeeCard from "../components/coffee/coffee-card";
import { CoffeeData } from "../data/coffee";
import { Coffee } from "@/app/types/coffee-data-types";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function CoffeePage() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#192438', '#313139']} style={{ flex: 1 }}>
                
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="menu-outline" size={28} color="white" />
                    </TouchableOpacity>

                    <View>
                        <Image source={require("@/assets/images/logoname.png")} />
                    </View>

                    <TouchableOpacity>
                        <Image
                            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                </View>

                <TextInput 
                    placeholderTextColor={"#FFFFFF"} 
                    placeholder='Search' 
                    style={styles.searchPlaceholder} 
                />

                <FlatList
                    data={CoffeeData as Coffee[]}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => router.push(`/coffee/${item.id}`)} 
                            style={styles.cardWrapper}
                        >
                            <CoffeeCard coffee={item} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.row}
                />
                
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E141E',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    avatar: {
        width: 35,
        height: 35,
    },
    searchPlaceholder: {
        padding: 15,
        height: 50,
        backgroundColor: '#171C26',
        color: "#FFFFFF",
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 50,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    cardWrapper: {
        flex: 1,
        maxWidth: '48%',
        marginBottom: 15,
    }
});