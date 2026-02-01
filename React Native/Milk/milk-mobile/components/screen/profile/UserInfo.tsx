import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Modal, TextInput, Alert, Platform, Animated } from "react-native";
import { Image } from 'expo-image';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { profileService } from "@/services/profileService";
import { profileSchema, ProfileFormData } from '@/types/profile-schema';

interface UserProfile {
    name: string;
    surname: string;
    email: string;
    avatarUrl?: string;
}

export const UserInfo = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [isModalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
    const [updating, setUpdating] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (isModalVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [isModalVisible, fadeAnim]);

    const fetchProfile = async () => {
        try {
            const data = await profileService.getProfile();
            setProfile(data);
            setFormData({ firstName: data.name, lastName: data.surname });
        } catch (error) {
            console.error("Failed to load profile", error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleUpdateProfile = async () => {
        const result = profileSchema.safeParse(formData);

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
            setUpdating(true);
            const updated = await profileService.updateProfile({
                name: formData.firstName,
                surname: formData.lastName
            });
            setProfile(updated);
            setErrors({});
            setModalVisible(false);
            Alert.alert("Success", "Profile updated successfully");
        } catch (error: any) {
            Alert.alert("Error", error.response?.data?.message || "Failed to update");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#3480EB" /></View>
    );

    return (
        <View>
            <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                    <Image source={{ uri: profile?.avatarUrl }} style={styles.avatar} contentFit="cover" transition={500} />
                    <TouchableOpacity style={styles.editIcon} onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="edit" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <Text style={styles.userName}>{profile ? `${profile.name} ${profile.surname}` : "User"}</Text>
                <Text style={styles.userEmail}>{profile?.email}</Text>
            </View>

            <Modal animationType='none' transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
                <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
                    <TouchableOpacity 
                        style={StyleSheet.absoluteFill} 
                        activeOpacity={1} 
                        onPress={closeModal} 
                    />

                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Edit Profile</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Ionicons name="close-circle" size={28} color="#CBD5E1" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>First Name</Text>
                            <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
                                <TextInput
                                    style={styles.input}
                                    value={formData.firstName}
                                    onChangeText={(v) => updateField('firstName', v)}
                                />
                            </View>
                            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Last Name</Text>
                            <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
                                <TextInput
                                    style={styles.input}
                                    value={formData.lastName}
                                    onChangeText={(v) => updateField('lastName', v)}
                                />
                            </View>
                            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                        </View>

                        <TouchableOpacity
                            style={[styles.saveButton, updating && { opacity: 0.7 }]}
                            onPress={handleUpdateProfile}
                            disabled={updating}
                        >
                            {updating ? <ActivityIndicator color="white" /> : <Text style={styles.saveButtonText}>Save Changes</Text>}
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        height: 200,
        justifyContent: 'center'
    },
    avatarSection: {
        marginTop: 30,
        alignItems: "center"
    },
    avatarWrapper: {
        position: 'relative'
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#F1F5F9'
    },
    editIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#3480EB",
        borderRadius: 20,
        padding: 8,
        borderWidth: 3,
        borderColor: 'white'
    },
    userInfoSection: {
        marginTop: 20,
        alignItems: "center"
    },
    userName: {
        fontSize: 24,
        fontFamily: "Jakarta-Bold",
        color: "#1A1A1A"
    },
    userEmail: {
        fontSize: 14,
        fontFamily: "Jakarta-Medium",
        color: "#94A3B8"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Jakarta-Bold',
        color: '#1A1A1A'
    },
    inputGroup: {
        marginBottom: 12
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
        height: 56
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Jakarta-Medium'
    },
    inputError: {
        borderColor: '#FF4D4F'
    },
    errorText: {
        color: '#FF4D4F',
        fontSize: 11,
        marginTop: 4,
        marginLeft: 5
    },
    saveButton: {
        backgroundColor: '#3480EB',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginTop: 10
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Jakarta-Bold'
    }
});