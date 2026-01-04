import AsyncStorage from "@react-native-async-storage/async-storage";

export type FavoriteItem = {
  id: number;
  title: string;
  price: number;
  image: any;
  rating?: number;
};

export async function getFavorites(): Promise<FavoriteItem[]> {
    const json = await AsyncStorage.getItem("favorites");
    return json ? JSON.parse(json) : [];
}

export async function isFavorite(id: number): Promise<boolean> {
  const favs = await getFavorites();
  return favs.some((x) => x.id === id);
}

export async function toggleFavorite(item: FavoriteItem): Promise<boolean> {
  // возвращает состояние: true=в избранном, false=удалено
  const favs = await getFavorites();

  const exists = favs.some((x) => x.id === item.id);
  const updated = exists ? favs.filter((x) => x.id !== item.id) : [item, ...favs];

  await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  return !exists;
}

export async function removeFavorite(id: number) {
  const favs = await getFavorites();
  const updated = favs.filter((x) => x.id !== id);
  await AsyncStorage.setItem("favorites", JSON.stringify(updated));
}

export async function clearFavorites() {
  await AsyncStorage.removeItem("favorites");
}
