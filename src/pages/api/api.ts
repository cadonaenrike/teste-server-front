import axios from "axios";
import { Product } from "@/interfaces/Product.interface";

const baseURL = "https://teste-server-back-end.vercel.app/";

export const ProductService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get<{ data: Product[] }>(
        `${baseURL}api/produtos/`
      );
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch products", error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await axios.get<Product>(`${baseURL}api/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product by id ${id}`, error);
      throw error;
    }
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await axios.post<Product>(
        `${baseURL}api/produtos`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Failed to create product", error);
      throw error;
    }
  },

  updateProduct: async (
    id: number,
    productData: Partial<Product>
  ): Promise<Product> => {
    try {
      const response = await axios.put<Product>(
        `${baseURL}api/produtos/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to update product with id ${id}`, error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      await axios.delete<void>(`${baseURL}api/produtos/${id}`);
    } catch (error) {
      console.error(`Failed to delete product with id ${id}`, error);
      throw error;
    }
  },
};
