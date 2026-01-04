import { login } from "@/src/api/authService";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const onSignIn = async () => {
        setErrorText("");

        const emailNorm = email.trim().toLowerCase();
        if (!emailNorm) return setErrorText("Enter your email");
        if (password.length < 6) return setErrorText("Password must be at least 6 characters long");

        try {
            setLoading(true);

            await login(emailNorm, password);

            router.replace("/(tabs)");
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ??
                err?.message ??
                "SignIn error";

            setErrorText(String(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#192438', '#313139']}
                style={styles.background}
            >
                <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/")}>
                    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.logoContainerStyles}>
                    <Image source={require("@/assets/images/logo.png")} />
                    <Image source={require("@/assets/images/logoname.png")} />
                </View>

                <View style={styles.formContainerStyles}>
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter your email address"
                        onChangeText={setEmail}
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        onChangeText={setPassword}
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />

                    {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
                </View>

                <Pressable
                    style={[styles.buttonStyles, loading && { opacity: 0.7 }]}
                    onPress={onSignIn}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Text style={styles.buttonTextStyles}>Sign in</Text>
                    )}
                </Pressable>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Don`t have an account? </Text>
                    <Pressable onPress={() => router.push("/signup/page")}>
                        <Text style={styles.footerLink}>Sign up</Text>
                    </Pressable>
                </View>

            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1, alignItems: 'center' },
    backButtonStyles: { position: 'absolute', top: 50, left: 20, width: 40 },
    logoContainerStyles: { marginTop: 110, gap: 10, marginBottom: 30 },
    formContainerStyles: { gap: 15, width: '85%' },
    formStyles: {
        fontSize: 16,
        backgroundColor: "#212330",
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 10,
        color: "#FFFFFF",
    },
    backBtn: {
        position: "absolute",
        left: 20,
        top: 20,
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: "#171C26",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#252A32",
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
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    footerLink: {
        color: '#854C1F',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: "#ffb4b4",
        fontSize: 14,
        marginTop: 6,
    },
});