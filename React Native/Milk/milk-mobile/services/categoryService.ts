import { Category } from "@/types/category";
import api from "./api";

export const categoryService = {
    async getAll() {
        const response = await api.get<Category[]>('/Categories');
        return response.data;
    }
} 