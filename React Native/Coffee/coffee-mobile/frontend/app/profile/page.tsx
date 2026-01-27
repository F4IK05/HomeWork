import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { me, logout } from "@/src/api/authService";

type MeDto = {
  email?: string;
  username?: string;
};

const MENU = [
  { key: "address", title: "Address", icon: "location-outline", route: "/profile/address-info/page" },
  { key: "payment", title: "Payment Method", icon: "card-outline", route: "/profile/payment-method/page" },
  { key: "card", title: "Card Information", icon: "card-outline", route: "/profile/card-info/page" },
];

export default function ProfilePage() {
  const [user, setUser] = useState<MeDto | null>(null);

  const loadMe = async () => {
    try {
      const data = await me();
      setUser(data);
    } catch (e: any) {
      setUser(null);
    } finally {
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const onLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "default",
        onPress: async () => {
          await logout();
          router.replace("/signin/page");
        },
      },
    ]);
  };

  const displayName = user?.username;
  const avatarUri =
    "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#192438", "#313139"]} style={styles.background}>
        <View style={styles.header}>
          
          <Text style={styles.headerTitle}>Profile</Text>

          
        </View>

          <>
            <View style={styles.userBlock}>
              <View style={styles.avatarWrap}>
                <Image source={{ uri: avatarUri }} style={styles.avatar} />
              </View>

              <Text style={styles.userName}>{displayName}</Text>
            </View>

            <View style={styles.menu}>
              {MENU.map((item) => (
                <TouchableOpacity key={item.key} style={styles.menuRow} onPress={() => router.push(item.route)}>
                  <View style={styles.menuLeft}>
                    <Ionicons name={item.icon as any} size={22} color="#D17842" />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={{ opacity: 0.85 }} />
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={[styles.menuRow, styles.logoutRow]} onPress={onLogout}>
                <View style={styles.menuLeft}>
                  <Ionicons name="log-out-outline" size={22} color="#D17842" />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E141E",
  },
  background: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "400",
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  userBlock: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#171C26",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 74,
    height: 74,
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.95,
  },
  menu: {
    paddingHorizontal: 20,
    gap: 14,
  },
  menuRow: {
    backgroundColor: "#171C26",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    opacity: 0.95,
  },

  logoutRow: {
    marginTop: 10,
  },
});
