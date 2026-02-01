import { View, Image, Text, StyleSheet } from "react-native"

export const SignInHeader = () => {
    return (
        <>
            <View style={styles.imageContainer}>
                <View style={styles.logoCircle}>
                    <Image
                        source={require('@/assets/images/milk/milk-logo.png')}
                        style={styles.image}
                    />
                </View>
            </View>

            <View style={styles.textSection}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>
                    Log in to manage your daily fresh milk delivery.
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: { 
        alignItems: 'center', 
    },
    logoCircle: {
        width: 200,
        height: 200,
        overflow: 'hidden'
    },
    image: { 
        width: '100%', 
        height: '100%', 
        resizeMode: 'cover' 
    },
    textSection: { 
        alignItems: 'center' 
    },
    title: { 
        fontSize: 28, 
        fontFamily: 'Jakarta-Bold', 
        color: '#1A1A1A' 
    },
    subtitle: { 
        fontSize: 15, 
        fontFamily: 'Jakarta-Medium', 
        color: '#64748B', 
        textAlign: 'center', 
        marginTop: 10,
        lineHeight: 22
    },
});