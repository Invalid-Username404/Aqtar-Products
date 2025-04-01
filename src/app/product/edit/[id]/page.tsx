"use client";

import { useEffect, useState } from "react";
import { api, Product } from "@/utils/api";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { toast } from "react-hot-toast";
import { usePathname } from "next/navigation";
import Head from "next/head";

export default function EditProductPage() {
  const pathname = usePathname();
  const id = pathname ? pathname.split("/").pop() || "" : "";

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error("Product ID is missing");
        }

        const productId = parseInt(id);

        if (isNaN(productId)) {
          throw new Error("Invalid product ID");
        }

        const data = await api.getProduct(productId);
        setProduct(data);
        document.title = `Edit ${data.title} - Your Store Name`;
      } catch (error: unknown) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product. Redirecting to home page.");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (productData: Omit<Product, "id" | "rating">) => {
    try {
      setIsSubmitting(true);
      const productId = parseInt(id);

      if (isNaN(productId)) {
        throw new Error("Invalid product ID");
      }

      await api.updateProduct(productId, productData);
      toast.success("Product updated successfully!");
      router.push(`/product/${productId}`);
    } catch (error: unknown) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-12 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Head>
        <title>Edit {product.title} - Your Store Name</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title, href: `/product/${id}` },
          { label: "Edit", href: `/product/edit/${id}`, active: true },
        ]}
      />

      <div className="space-y-6 mt-6">
        <h1
          className="text-2xl font-bold md:text-3xl"
          id="edit-product-heading"
        >
          Edit Product
        </h1>

        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          isEditing={true}
        />

        <div className="flex justify-between pt-4 border-t border-gray-200 mt-8">
          <Link
            href={`/product/${id}`}
            className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Cancel editing and return to product page"
          >
            <span aria-hidden="true">←</span> Cancel
          </Link>
        </div>
      </div>
    </main>
  );
}
