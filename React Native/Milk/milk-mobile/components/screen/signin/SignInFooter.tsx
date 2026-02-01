import { router } from "expo-router"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export const SignInFooter = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup/page')}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40
    },
    footerText: { 
        color: '#64748B', 
        fontFamily: 'Jakarta-Medium' 
    },
    signUpText: { 
        color: '#3480EB', 
        fontFamily: 'Jakarta-Bold' 
    }
});