import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { register } from "@/src/api/authService";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const onSignUp = async () => {
        setErrorText("");

        const emailNorm = email.trim().toLowerCase();
        const usernameNorm = username.trim();

        if (!emailNorm) return setErrorText("Enter your email");
        if (!emailNorm.includes("@")) return setErrorText("Wrong Email");

        if (!usernameNorm) return setErrorText("Enter username");
        if (usernameNorm.length < 3) return setErrorText("Username minimum 3 characters");
        if (usernameNorm.length > 100) return setErrorText("Username is too long");

        if (password.length < 6) return setErrorText("Password must be at least 6 characters long");
        if (password !== confirm) return setErrorText("The passwords don't match");

        try {
            setLoading(true);
            await register(emailNorm, password, usernameNorm);

            router.push("/signin/page");
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ??
                err?.message ??
                "SignUp error";

            setErrorText(String(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#192438", "#313139"]} style={styles.background}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/")}>
                    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.logoContainerStyles}>
                    <Text style={styles.headerTitle}>Create Account</Text>
                    <Text style={styles.headerSubtitle}>Fill in your details to get started</Text>
                </View>

                <View style={styles.formContainerStyles}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="Enter your email address"
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />

                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        placeholder="Create username"
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder="Create password"
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />

                    <TextInput
                        value={confirm}
                        onChangeText={setConfirm}
                        secureTextEntry
                        placeholder="Confirm password"
                        style={styles.formStyles}
                        placeholderTextColor={"#FFFFFF"}
                    />

                    {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
                </View>

                <Pressable
                    style={[styles.buttonStyles, loading && { opacity: 0.7 }]}
                    onPress={onSignUp}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator /> : <Text style={styles.buttonTextStyles}>Sign up</Text>}
                </Pressable>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Pressable onPress={() => router.push("/signin/page")}>
                        <Text style={styles.footerLink}>Sign in</Text>
                    </Pressable>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1
    },
    background: { 
        flex: 1, 
        alignItems: "center" 
    },
    backButtonStyles: { 
        position: "absolute", 
        top: 50, 
        left: 20, 
        width: 40 
    },
    logoContainerStyles: { 
        marginTop: 110, 
        alignItems: "center", 
        marginBottom: 30 
    },
    headerTitle: { 
        color: "#FFFFFF", 
        fontSize: 28, 
        fontWeight: "bold" 
    },
    headerSubtitle: { 
        color: "#AAAAAA", 
        fontSize: 14, 
        marginTop: 5 
    },
    formContainerStyles: { 
        gap: 15, 
        width: "85%"
    },
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
        width: "85%",
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
    footerContainer: { flexDirection: "row", marginTop: 20 },
    footerText: { color: "#FFFFFF", fontSize: 18 },
    footerLink: { color: "#854C1F", fontSize: 18, fontWeight: "bold" },
    errorText: { color: "#ffb4b4", fontSize: 14, marginTop: 6 },
});
