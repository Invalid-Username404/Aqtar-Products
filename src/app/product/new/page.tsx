"use client";

import { api, Product } from "@/utils/api";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = async (productData: Omit<Product, "id" | "rating">) => {
    await api.createProduct(productData);
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
