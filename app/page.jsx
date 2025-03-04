"use client";

import { useFetchProducts } from "@/store/useProductStore";
import ProductList from "@/components/ProductList";
import Loading from "./loading";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useFetchProducts();

  if (isLoading) return <Loading />;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return <ProductList initialProducts={products || []} />;
}
