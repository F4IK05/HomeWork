import { CartResponse } from "@/types/cart"
import api from "./api"

export const cartService = {
    async getMyCart() {
        const response = await api.get<CartResponse>('/Cart');
        return response.data;
    },

    async addToCart(productId: string, quantity: number = 1) {
        const response = await api.post<CartResponse>('/Cart/items/add-to-cart', { productId, quantity });
        return response.data;
    },

    async updateQty(cartItemId: string, quantity: number) {
        const response = await api.post<CartResponse>(`/Cart/items/update-qty/${cartItemId}`, { quantity }) ;
        return response.data;
    },

    async removeFromCart(cartItemId: string) {
        const response = await api.delete<CartResponse>(`/Cart/items/remove-from-cart/${cartItemId}`);
        return response.data;
    },

    async clearCart() {
        const response = await api.delete<CartResponse>('/Cart/clear-cart');
        return response.data;
    }
}