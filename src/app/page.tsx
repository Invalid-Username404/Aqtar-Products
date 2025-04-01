import { api } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - Store",
  description: "Browse our catalog of products",
};

export default async function Home() {
  try {
    const products = await api.getAllProducts();

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">All Products</h1>

        {products.length === 0 ? (
          <p className="text-center py-10">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">
          Error Loading Products
        </h1>
        <p className="mt-4">Please try again later</p>
      </div>
    );
  }
}
