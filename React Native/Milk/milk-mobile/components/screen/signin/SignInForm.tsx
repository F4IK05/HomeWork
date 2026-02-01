import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { signInSchema, SignInFormData } from '@/types/signin-schema';
import { AuthService } from '@/services/authService';
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router';

export const SignInForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof SignInFormData, string>>>({});

    const handleSignIn = async () => {
        const result = signInSchema.safeParse(formData);

        if (!result.success) {
            const flatErrors = result.error.flatten().fieldErrors;
            const formattedErrors: any = {};
            Object.keys(flatErrors).forEach(key => {
                formattedErrors[key] = flatErrors[key]?.[0];
            });
            setErrors(formattedErrors);
        }

        try {
            const response = await AuthService.login(formData);

            await SecureStore.setItemAsync('userToken', response.token);


            setErrors({});
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert("Login Failed", "Invalid email or password");
        }
    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Feather name="mail" size={18} color="#3480EB" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="user@example.com"
                    placeholderTextColor="#ADC1D2"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(v) => updateField('email', v)}
                />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Feather name="lock" size={18} color="#3480EB" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#ADC1D2"
                    secureTextEntry={!passwordVisible}
                    onChangeText={(v) => updateField('password', v)}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather
                        name={passwordVisible ? "eye" : "eye-off"}
                        size={18}
                        color="#ADC1D2"
                    />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
                <Text style={styles.signInBtnText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    form: { marginTop: 25 },
    label: {
        fontSize: 14,
        fontFamily: 'Jakarta-SemiBold',
        color: '#1A1A1A',
        marginBottom: 8
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingHorizontal: 15,
        height: 56,
        marginBottom: 4
    },
    inputError: { borderColor: '#FF4D4F' },
    errorText: {
        color: '#FF4D4F',
        fontSize: 11,
        fontFamily: 'Jakarta-Medium',
        marginBottom: 12,
        marginLeft: 5
    },
    inputIcon: { marginRight: 12 },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Jakarta-Medium',
        color: '#1A1A1A'
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 25
    },
    forgotText: {
        color: '#3480EB',
        fontFamily: 'Jakarta-SemiBold',
        fontSize: 14
    },
    signInBtn: {
        backgroundColor: '#3480EB',
        height: 58,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3480EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    signInBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Jakarta-Bold'
    },
});