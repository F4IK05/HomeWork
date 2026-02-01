import { Dimensions, ImageBackground, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8; // 80% ширины экрана

export const PromoCard = ({ item }: { item: any }) => {
    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.cardContainer}>
            <ImageBackground
                source={item.image}
                style={styles.backgroundImage}
                imageStyle={{ borderRadius: 24 }}
            >
                <View style={styles.overlay}>
                    <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>

                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: CARD_WIDTH * 0.95,
        height: 180,
        marginRight: 15,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 24,
        padding: 20,
        justifyContent: 'space-between',
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Jakarta-Bold',
        letterSpacing: 0.5,
    },
    title: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Jakarta-Bold',
        lineHeight: 28,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontFamily: 'Jakarta-Medium',
        marginTop: 6,
    },
});