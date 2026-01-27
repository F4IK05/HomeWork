import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardFormData } from "@/app/types/card-schema";

const CARD_STORAGE_KEY = "@card_details";

export const cardStorage = {
  saveCard: async (data: CardFormData) => {
    try {
      await AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving card data", e);
      throw e;
    }
  },

  getCard: async (): Promise<CardFormData | null> => {
    try {
      const data = await AsyncStorage.getItem(CARD_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error fetching card data", e);
      return null;
    }
  },

  clearCard: async () => {
    try {
      await AsyncStorage.removeItem(CARD_STORAGE_KEY);
    } catch (e) {
      console.error("Error clearing card data", e);
    }
  }
};