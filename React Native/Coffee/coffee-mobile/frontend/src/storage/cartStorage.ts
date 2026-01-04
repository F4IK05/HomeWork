import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: ImageSourcePropType;
    size: "S" | "M" | "L";
    qty: number;
};

export async function getCart(): Promise<CartItem[]> {
    const json = await AsyncStorage.getItem("cart");
    return json ? JSON.parse(json) : [];
}

export async function addToCart(item: CartItem) {
    const cart = await getCart();

    const existing = cart.find(
        (c) => (c.id === item.id && c.size === item.size)
    );

    if (existing) {
        existing.qty += item.qty;
    } else {
        cart.push(item);
    }

    await AsyncStorage.setItem("cart", JSON.stringify(cart));
}

export async function removeFromCart(id: number, size: CartItem["size"]) {
    const cart = await getCart();

    const updated = cart.filter(
        (c) => !(c.id === id && c.size === size)
    );

    await AsyncStorage.setItem("cart", JSON.stringify(updated));
}

export async function clearCart() {
  await AsyncStorage.removeItem("cart");
}