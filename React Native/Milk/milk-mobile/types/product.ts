export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    volume: string;
    imageUrl: string;
    categoryId: string;
    categoryName: string;
    categorySlug: string;
}

export interface PagedResponse<T> {
    page: number;
    pageSize: number;
    total: number;
    items: T[];
}