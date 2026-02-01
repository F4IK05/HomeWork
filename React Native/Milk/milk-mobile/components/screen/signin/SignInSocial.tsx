import { FontAwesome } from "@expo/vector-icons"
import { View, TouchableOpacity, StyleSheet } from "react-native"

export const SignInSocial = () => {
    return (
        <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialBtn}>
                <FontAwesome name="google" size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
                <FontAwesome name="apple" size={22} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
                <FontAwesome name="facebook" size={20} color="#1A1A1A" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15
    },
    socialBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
})