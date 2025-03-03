import { create } from "zustand";
import api from "@/lib/axiosInstance";
import Cookies from "js-cookie";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await api.get("/products");
      const data = await response.data;
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

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const token = Cookies.get("adminToken");

      if (!token) {
        throw new Error("Admin token not found. Please log in.");
      }

      const response = await api.post(`/products/product/create`, productData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include Bearer token
        },
      });

      const data = await response.data;
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
      set({ error: error.message, loading: false });
    }
  },
  loginUser: async (userCredentials) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post(`/admin/login`, userCredentials);
      const data = await response.data;

      if (data.token) {
        Cookies.set("adminToken", data.token, { expires: 7 });
        set({ isLoggedIn: true });
        window.location.href = "/";
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useProductStore;
