import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { signUpSchema, SignUpFormData } from '@/types/signup-schema'
import { AuthService } from '@/services/authService';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [isCheckingEmail, setIsCheckingEmail] = useState(false);

    const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});

    const handleSignUp = async () => {
        const result = signUpSchema.safeParse({ ...formData });

        if (!result.success) {
            const flatErrors = result.error.flatten().fieldErrors;
            const formattedErrors: any = {};
            Object.keys(flatErrors).forEach(key => {
                formattedErrors[key] = flatErrors[key]?.[0];
            });
            setErrors(formattedErrors);
            return;
        }

        try {
            setIsCheckingEmail(true);

            // проверка на то что свободен ли email
            const emailCheck = await AuthService.checkEmail(formData.email);

            if (!emailCheck.isAvailable) {
                setErrors(prev => ({ 
                    ...prev, 
                    email: "This email is already registered" 
                }));
                setIsCheckingEmail(false);
                return;
            }

            // если свободен
            const response = await AuthService.register({
                name: formData.firstName,
                surname: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            // сохранение токена
            await SecureStore.setItemAsync('userToken', response.token);

            setErrors({});
            router.push('/(tabs)')
        } catch (error: any) {
            const message = error.response?.data.message || "Failed";
            Alert.alert("Error", message)
        } finally {
            setIsCheckingEmail(false);  
        }

    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <View style={styles.form}>
            <View style={styles.nameRow}>
                <View style={styles.nameInputWrapper}>
                    <Text style={styles.label}>First Name</Text>
                    <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
                        <Feather name="user" size={18} color="#3480EB" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input} placeholder="Name"
                            onChangeText={(v) => updateField('firstName', v)}
                        />
                    </View>
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                </View>

                <View style={styles.nameInputWrapper}>
                    <Text style={styles.label}>Last Name</Text>
                    <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
                        <TextInput
                            style={styles.input} placeholder="Surname"
                            onChangeText={(v) => updateField('lastName', v)}
                        />
                    </View>
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                </View>
            </View>

            <Text style={styles.label}>Email Address</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Feather name="mail" size={18} color="#3480EB" style={styles.inputIcon} />
                <TextInput
                    style={styles.input} placeholder="Enter your email"
                    autoCapitalize="none"
                    onChangeText={(v) => updateField('email', v)}
                />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Password</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Feather name="lock" size={18} color="#3480EB" style={styles.inputIcon} />
                <TextInput
                    style={styles.input} placeholder="8+ chars, 1 uppercase"
                    secureTextEntry={!passwordVisible}
                    onChangeText={(v) => updateField('password', v)}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather name={passwordVisible ? "eye" : "eye-off"} size={18} color="#ADC1D2" />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
                <Text style={styles.signUpBtnText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 25
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameInputWrapper: {
        flex: 1,
        marginRight: 10
    },
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
    inputError: {
        borderColor: '#FF4D4F'
    },
    errorText: {
        color: '#FF4D4F',
        fontSize: 11,
        marginBottom: 10,
        marginLeft: 5
    },
    inputIcon: {
        marginRight: 12
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Jakarta-Medium'
    },
    signUpBtn: {
        marginTop: 30,
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
    signUpBtnText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontFamily: 'Jakarta-Bold' 
    }
});