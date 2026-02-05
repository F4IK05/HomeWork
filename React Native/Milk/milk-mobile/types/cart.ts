export interface CartItem {
    id: string;
    productId: string;
    title: string;
    volume: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
}

export interface CartResponse {
    cartId: string;
    items: CartItem[];
    totalPrice: number;
}