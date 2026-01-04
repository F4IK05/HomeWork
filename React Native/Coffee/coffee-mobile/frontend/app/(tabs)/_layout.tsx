import { Tabs } from "expo-router";
import { Home, Heart, ShoppingCart, User } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          margin: 16,

          borderRadius: 25,

          backgroundColor: "rgba(20, 20, 20, 0.95)",
          borderTopWidth: 0,
        },

        tabBarItemStyle: {
            marginTop: 16
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Home
              size={30}
              color={focused ? "#D17842" : "#8E8E93"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <User
              size={30}
              color={focused ? "#D17842" : "#8E8E93"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Heart
              size={30}
              color={focused ? "#D17842" : "#8E8E93"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <ShoppingCart
              size={26}
              color={focused ? "#D17842" : "#8E8E93"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
