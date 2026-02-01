import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { MenuItem } from "./MenuItem";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";

export const ProfileMenu = () => {

  const hanfleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync("userToken")
              
              router.replace("/signin/page");
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Could not log out. Please try again.");
            }
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <MenuItem
        icon="receipt-outline"
        title="Order History"
        onPress={() => console.log('Orders')}
      />
      <MenuItem
        icon="calendar-outline"
        title="My Subscriptions"
        onPress={() => console.log('Subs')}
      />
      <MenuItem
        icon="location-outline"
        title="Delivery Addresses"
        onPress={() => console.log('Address')}
      />
      <MenuItem
        icon="card-outline"
        title="Payment Methods"
        onPress={() => console.log('Payments')}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={hanfleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
  },
  logoutText: {
    color: '#fd6868',
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",

  },
});