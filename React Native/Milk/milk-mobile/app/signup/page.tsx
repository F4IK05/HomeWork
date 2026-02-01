import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignUpHeader } from '@/components/screen/signup/SignUpHeader';
import { SignUpForm } from '@/components/screen/signup/SignUpForm';
import { SignUpFooter } from '@/components/screen/signup/SignUpFooter';

export default function SignUpPage() {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustKeyboardInsets={true}
                >

                    <SignUpHeader />

                    <SignUpForm />

                    <SignUpFooter />

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },

});