import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#192438', '#313139']}
                style={styles.background}
            >
                <Pressable style={styles.backButtonStyles} onPress={() => router.back()} >
                    <Image
                        source={require("@/assets/images/back.png")}
                    />
                </Pressable>

                <View style={styles.logoContainerStyles}>
                    <Image
                        source={require("@/assets/images/logo.png")}
                    />

                    <Image
                        source={require("@/assets/images/logoname.png")}

                    />
                </View>

                <View style={styles.formContainerStyles}>
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter your email address"
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />


                    <TextInput
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />

                </View>



                <Pressable style={styles.buttonStyles} onPress={() => console.log('sign in')}>
                    <Text style={styles.buttonTextStyles}>Sign in</Text>
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
    backButtonStyles: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
    },
    logoContainerStyles: {
        marginTop: 110,
        gap: 10,
        marginBottom: 30,
    },
    formContainerStyles: {
        gap: 15,
        width: '85%',
    },
    formStyles: {
        fontSize: 16,
        backgroundColor: "#212330",
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 10,
        color: "#FFFFFF",
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