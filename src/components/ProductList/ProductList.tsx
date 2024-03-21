import React, { useState } from "react";

import ProductComponent from "../Product/Product";
import { Product } from "@/interfaces/Product.interface";
import CreateProductModal from "../ProductModals/ProductCreate";
import Image from "next/image";

interface ProductListProps {
  products: Product[];
  onProductUpdated: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductUpdated,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductComponent
            key={product.codigo}
            product={product}
            onProductUpdated={onProductUpdated}
          />
        ))}
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-9 right-9 bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-5 rounded-full shadow-lg transition ease-in-out duration-150"
      >
        + Criar Produto
      </button>

      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onProductCreated={onProductUpdated}
        />
      )}
    </div>
  );
};

export default ProductList;
