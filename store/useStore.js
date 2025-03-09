import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axiosInstance";
import Cookies from "js-cookie";

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
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");
      const response = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
const fetchOrderById = async (orderId) => {
  if (!orderId) throw new Error("Order ID is required.");
  const token = Cookies.get("adminToken");
  if (!token) throw new Error("Admin token not found. Please log in.");
  const response = await api.get(`/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useFetchOrderById = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderById(orderId),
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
      queryClient.invalidateQueries(["products"]);
    },
  });
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) => {
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");
      const response = await api.delete(
        `/products/product/delete/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
        Cookies.set("adminToken", data.token, { expires: 7 });
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
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");
      const response = await api.patch(
        `/orders/deliver/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
    onError: (error) => {
      console.error("Error delivering order:", error.message);
      alert(error.message);
    },
  });
};

// Cancel an order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");
      const response = await api.patch(
        `/orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
    onError: (error) => {
      console.error("Error cancelling order:", error.message);
      alert(error.message);
    },
  });
};

// Delete an order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");
      const response = await api.patch(
        `/orders/delete/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
    onError: (error) => {
      console.error("Error deleting order:", error.message);
      alert(error.message);
    },
  });
};

export default useStore;
