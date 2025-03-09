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
export const useFetchOrders = () => {
  return useQuery({
    queryKey: ["orders"],

    queryFn: async () => {
      const token = Cookies.get("adminToken");
      if (!token) {
        throw new Error("Admin token not found. Please log in.");
      }

      try {
        const response = await api.get("/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch orders."
        );
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
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

// Delete product  (React Query Mutation)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const token = Cookies.get("adminToken");
      if (!token) throw new Error("Admin token not found. Please log in.");

      const response = await api.delete(
        `/products/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refetch products after deletion
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

const fetchOrderById = async (orderId) => {
  if (!orderId) throw new Error("Order ID is required.");

  const token = Cookies.get("adminToken");
  if (!token) throw new Error("Admin token not found. Please log in.");

  const response = await api.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useFetchOrderById = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId], // Cache key includes orderId
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false, // Prevents refetching on window focus
    keepPreviousData: true, // Keeps previous data while fetching new
  });
};

export default useProductStore;

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orderId"]);
    },
    onError: (error) => {
      console.error("Error delivering order:", error.message);
      alert(error.message);
    },
  });
};

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orderId"]);
    },
    onError: (error) => {
      console.error("Error cancelling order:", error.message);
      alert(error.message);
    },
  });
};
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orderId"]);
    },
    onError: (error) => {
      console.error("Error deleting order:", error.message);
      alert(error.message);
    },
  });
};
