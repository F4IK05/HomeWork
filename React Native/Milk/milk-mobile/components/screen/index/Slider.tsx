import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export const Slider = ({ item, index, handleBack, onDone }: { item: any; index: number, handleBack: () => void, onDone: () => void }) => {
    return (
        <View style={styles.slide}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {index > 0 && (
                            <TouchableOpacity onPress={handleBack}>
                                <Ionicons name="chevron-back" size={24} color="#3480EB" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.headerTitle}>{item.headerTitle}</Text>
                    <TouchableOpacity onPress={onDone} style={styles.headerRight}>
                        {index < 2 && <Text style={styles.skipText}>Skip</Text>}
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.text}</Text>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: { 
        flex: 1, 
        backgroundColor: 'transparent',
        
    },
    container: { 
        flex: 1, 
        backgroundColor: '#fff',
        
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerLeft: { 
        width: 40 
    },
    headerRight: { 
        width: 40, 
        alignItems: 'flex-end' 
    },
    headerTitle: { 
        fontSize: 18, 
        color: '#1A1A1A',
        fontFamily: "Jakarta-SemiBold", 
    },
    skipText: { 
        color: '#3480EB', 
        fontSize: 14, 
        fontFamily: "Jakarta-SemiBold", 
    },

    imageContainer: {
        paddingHorizontal: 20,
        width: '100%',
        height: width * 0.8,
        overflow: 'hidden',
        marginTop: 20,
    },
    image: { 
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover',
        borderRadius: 24,
    },

    textContainer: { 
        
        alignItems: 'center', 
        marginTop: 30, 
        paddingHorizontal: 20 
    },
    title: { 
        fontFamily: "Jakarta-SemiBold", 
        fontSize: 28, 
        color: '#1A1A1A', 
        textAlign: 'center' 
    },
    description: {
        fontFamily: "Jakarta-Regular",
        fontSize: 16,
        color: '#667085',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
    },
});