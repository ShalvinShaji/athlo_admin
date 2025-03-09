import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";

const useStore = create((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

// Fetch all products
export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data.message || [];
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    keepPreviousData: true,
  });
};

// Fetch all orders
export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get("/orders");
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// Fetch a product by ID
export const useFetchProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 15,
    keepPreviousData: true,
  });
};

// Fetch an order by ID
export const useFetchOrderById = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// Create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productData) => {
      const response = await api.post(`/products/product/create`, productData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const response = await api.delete(
        `/products/product/delete/${productId}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// Admin login
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (userCredentials) => {
      const response = await api.post(`/admin/login`, userCredentials);
      const data = response.data;
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "/";
      }
      return data;
    },
  });
};

// Deliver an order
export const useDeliverOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.patch(`/orders/deliver/${orderId}`, {});
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
  });
};

// Cancel an order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.patch(`/orders/cancel/${orderId}`, {});
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
  });
};

// Delete an order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await api.patch(`/orders/delete/${orderId}`, {});
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
  });
};

export default useStore;
