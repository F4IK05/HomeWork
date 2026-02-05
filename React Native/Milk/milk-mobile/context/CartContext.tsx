import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '@/services/cartService';
import { CartResponse } from '@/types/cart';

interface CartContextType {
    cart: CartResponse | null;
    loading: boolean;
    addToCart: (productId: string, qty: number) => Promise<void>;
    updateQty: (itemId: string, qty: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const refreshCart = async () => {
        try {
            const data = await cartService.getMyCart();
            setCart(data);
        } catch (e) {
            console.log("Cart empty or unauthorized");
        }
    };

    useEffect(() => { refreshCart(); }, []);

    const addToCart = async (productId: string, qty: number) => {
        const updatedCart = await cartService.addToCart(productId, qty);
        setCart(updatedCart);
    };

    const updateQty = async (itemId: string, qty: number) => {
        const updatedCart = await cartService.updateQty(itemId, qty);
        setCart(updatedCart);
    };

    const removeItem = async (itemId: string) => {
        const updatedCart = await cartService.removeFromCart(itemId);
        setCart(updatedCart);
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            const updatedCart = await cartService.clearCart();
            setCart(updatedCart);
        } catch (error) {
            console.error("Failed to clear cart:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, updateQty, removeItem, clearCart, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};