import axios from "axios";
import type { SongData } from "@/types/SongData";

const API_BASE = "http://localhost:5191/api";

export const songApi = {
  // Только получение всех песен
  async getAll(): Promise<SongData[]> {
    const res = await axios.get(`${API_BASE}/Songs`);
    return res.data;
  },
};
