import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainPage() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <View style={styles.iconBox}>
                        <Ionicons name="location" size={20} color="#FFCD1D" />
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.label}>Your location</Text>
                    <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
                        <Text style={styles.locationName} numberOfLines={1}>
                            Ngangphaf,Selman
                        </Text>
                        <Ionicons name="chevron-down" size={18} color="black" style={styles.chevron} />
                    </TouchableOpacity>
                </View>

                <Image
                    source={{ uri: 'https://img.freepik.com/free-photo/close-up-portrait-handsome-male-model-with-crisp-hair_176532-8160.jpg?semt=ais_hybrid&w=740&q=80' }}
                    style={styles.avatar}
                />
            </View>
            <View>
                <View style={styles.mainTextBlock}>
                    <Text style={styles.mainTextContent}>Find your favourite vechicle.</Text>
                </View>
                <View style={styles.search}>
                    <Ionicons name="search" size={20} />
                    <TextInput style={{}} placeholderTextColor={"black"} placeholder="Search vechicle" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    chevron: {
        marginLeft: 4,
        marginTop: 2,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#eee',
    },
    mainTextBlock: {
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
    mainTextContent: {
        fontSize: 30,
        fontWeight: 400,
    },
    search: {
        paddingLeft: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginHorizontal: 30,
        borderRadius: 30,
        height: 59,
    }
})