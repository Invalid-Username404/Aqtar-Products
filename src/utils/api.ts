/**
 * API service for interacting with the  Store API
 */

export type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

const BASE_URL = "https://fakestoreapi.com";

export const api = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },

  // Get a single product by ID
  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
    return response.json();
  },

  // Create a new product
  async createProduct(
    product: Omit<Product, "id" | "rating">
  ): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    return response.json();
  },

  // Update an existing product
  async updateProduct(
    id: number,
    product: Partial<Omit<Product, "id" | "rating">>
  ): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`Failed to update product with ID ${id}`);
    }
    return response.json();
  },

  // Delete a product
  async deleteProduct(id: number): Promise<{ success: boolean }> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product with ID ${id}`);
    }
    return { success: true };
  },
};
