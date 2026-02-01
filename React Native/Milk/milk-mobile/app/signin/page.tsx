import { KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInHeader } from "@/components/screen/signin/SignInHeader";
import { SignInForm } from "@/components/screen/signin/SignInForm";
import { SignInSocial } from "@/components/screen/signin/SignInSocial";
import { SignInFooter } from "@/components/screen/signin/SignInFooter";

export default function SignInPage() {
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
                    <SignInHeader />

                    <SignInForm />

                    <View style={styles.dividerContainer}>
                        <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                    </View>

                    <SignInSocial />

                    <SignInFooter />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 40
    },

    dividerContainer: {
        alignItems: 'center',
        marginVertical: 30
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 12,
        fontFamily: 'Jakarta-SemiBold',
        color: '#94A3B8'
    },
});