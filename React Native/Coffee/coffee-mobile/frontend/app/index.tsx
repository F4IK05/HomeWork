import { Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#192438', '#313139']}
                style={styles.background}
            >
                <Image
                    source={require("@/assets/images/cup.png")}
                    style={styles.cupStyles}
                />

                <Text style={styles.introText}>
                    Enjoy quality brew with the finest of flavours
                </Text>

                <Text style={styles.subIntroText}>
                    The best gain, the finest roast, the powerful flavor.
                </Text>

                <Pressable style={styles.buttonStyles} onPress={() => router.push('/signin/page')}>
                    <Text style={styles.buttonTextStyles}>Get started</Text>
                </Pressable>

            </LinearGradient>

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    background: {
        flex: 1,
        alignItems: 'center',
    },

    cupStyles: {
        width: '100%',
        height: 320,
        resizeMode: 'cover',
        marginTop: 123,
    },
    introText: {
        color: "#F3F3F3",
        marginTop: 60,
        fontSize: 35,
        paddingHorizontal: 30,
        textAlign: "center",
        fontWeight: "300",
        letterSpacing: 1.2
    },
    subIntroText: {
        color: "#F3F3F3",
        marginTop: 20,
        fontSize: 16,
        paddingHorizontal: 80,
        textAlign: "center",
        fontWeight: "300",
        letterSpacing: 0.1
    },
    buttonStyles: {
        width: '85%',
        marginTop: 35,
        backgroundColor: "#854C1F",
        paddingVertical: 15,
        borderRadius: 10,
        
    },
    buttonTextStyles: {
        color: "#FFFFFF",
        fontSize: 20,
        letterSpacing: 0.5,
        fontWeight: "300",
        textAlign: "center",
    }
});