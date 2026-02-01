import api from './api';
import { Product, PagedResponse } from '@/types/product';

export const productService = {
    async getAll(params: { page?: number; pageSize?: number; search?: string; categorySlug?: string } = {}) {
        const response = await api.get<PagedResponse<Product>>('/Products/get-all', {
            params
        });
        return response.data;
    },

    async getById(id: string) {
        const response = await api.get<Product>(`/Products/${id}`);
        return response.data;
    },

    async getByCategory(slug: string) {
        const response = await api.get<Product[]>(`/Products/by-category/${slug}`);
        return response.data;
    }
};