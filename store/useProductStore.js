import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import Cookies from "js-cookie";

// Zustand for client-side state management
const useProductStore = create((set) => ({
  selectedCategory: null,

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },
}));

// Fetch all products (React Query)
export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data.message || [];
    },
  });
};

// Fetch a product by ID (React Query)
export const useFetchProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Create a new product (React Query Mutation)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData) => {
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");

      const response = await api.post(`/products/product/create`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refetch products after creating
    },
  });
};

// Admin login (React Query Mutation)
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (userCredentials) => {
      const response = await api.post(`/admin/login`, userCredentials);
      const data = response.data;

      if (data.token) {
        Cookies.set("adminToken", data.token, { expires: 7 });
        window.location.href = "/";
      }
      return data;
    },
  });
};

export default useProductStore;
