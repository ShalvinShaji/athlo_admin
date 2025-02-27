import api from "@/lib/axiosInstance";
import ProductList from "@/components/ProductList"; // Import client component

export async function getProducts() {
  try {
    const response = await api.get("/products");
    return response.data.message;
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage() {
  const initialProducts = await getProducts();

  return <ProductList initialProducts={initialProducts} />;
}
