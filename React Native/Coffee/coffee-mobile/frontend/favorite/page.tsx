import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { getFavorites, removeFavorite, clearFavorites, FavoriteItem } from "@/src/storage/favoritesStorage";

export default function FavPage() {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      setItems(await getFavorites());
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(
      () => { 
        load();
      }, [])
  );

  useEffect(() => { 
      load();
    }, []
  );

  const onRemove = (id: number) => {
    Alert.alert("Remove", "Remove from favorites?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await removeFavorite(id);
          load();
        },
      },
    ]);
  };

  const onClear = () => {
    if (items.length === 0) return;
    Alert.alert("Clear favorites", "Remove all favorites?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearFavorites();
          load();
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => {
    const imgSource =
      typeof item.image === "number" ? item.image : { uri: String(item.image) };

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.card}
        onPress={() =>
          router.push(`/coffee/${item.id}`)
        }
      >
        <View style={styles.cardLeft}>
          <Image source={imgSource} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>

              {typeof item.rating === "number" && (
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={14} color="#D17842" />
                  <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item.id)}>
          <Ionicons name="heart-dislike-outline" size={20} color="#D17842" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#192438", "#313139"]} style={styles.bg}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favorites</Text>

          <TouchableOpacity style={styles.headerBtn} onPress={onClear}>
            <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.center}>
            <Text style={{ color: "#C9CCD3" }}>Loading...</Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.center}>
            <Ionicons name="heart-outline" size={42} color="#52555A" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySub}>Tap the heart to save coffee</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(i) => String(i.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0E141E" },
  bg: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "700" },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#171C26",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#252A32",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  emptySub: {
    color: "#AEB2B9",
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110, // под floating tabs
    gap: 12,
  },

  card: {
    backgroundColor: "#171C26",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#252A32",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  image: {
    width: 62,
    height: 62,
    borderRadius: 14,
    resizeMode: "contain",
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  title: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  price: { color: "#D17842", fontSize: 13, fontWeight: "800" },

  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#11161F",
    borderWidth: 1,
    borderColor: "#1C222E",
  },
  ratingText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#11161F",
    borderWidth: 1,
    borderColor: "#1C222E",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
