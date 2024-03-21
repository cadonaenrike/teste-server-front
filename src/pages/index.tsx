import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductList/ProductList";
import { ProductService } from "@/pages/api/api";
import { Product } from "@/interfaces/Product.interface";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const productsData = await ProductService.getAllProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="p-6 bg-white shadow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-32 h-10 relative">
            <Image
              src="https://www.serverinfo.com.br/templates/img/logo-server-software.svg"
              alt="Server Software Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className="text-lg font-semibold">Desafio React Jr</h2>
        </div>
      </header>
      <main className="py-10">
        <div className="container mx-auto text-start">
          <h1 className="p-2 text-3xl font-bold mb-4">Lista de Produtos</h1>
          <ProductList products={products} onProductUpdated={fetchProducts} />
        </div>
      </main>
    </div>
  );
}
