import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export const SignUpFooter = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.logInText}>Log In</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    footer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 35 
    },
    footerText: { 
        color: '#64748B', 
        fontSize: 14, 
        fontFamily: 'Jakarta-Medium' 
    },
    logInText: { 
        color: '#3480EB', 
        fontSize: 14, 
        fontFamily: 'Jakarta-Bold' 
    }
});