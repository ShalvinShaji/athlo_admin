import { create } from "zustand";
import api from "@/lib/axiosInstance";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await api.get("/products");
      const data = await response.json();
      set({ products: data.message || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await api.get(`/products/${id}`);
      set((state) => ({
        products: [...state.products, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
