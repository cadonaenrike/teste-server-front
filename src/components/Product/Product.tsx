import React, { useState } from "react";
import { Product as ProductInterface } from "@/interfaces/Product.interface";
import { ProductService } from "@/pages/api/api";
import EditProductModal from "../ProductModals/ProductEdit";
import ProductDetails from "../ProductDetails/ProductDetails";

interface ProductProps {
  product: ProductInterface;
  onProductUpdated: () => void;
}

const Product: React.FC<ProductProps> = ({ product, onProductUpdated }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (confirmDelete) {
      try {
        await ProductService.deleteProduct(product.codigo);
        onProductUpdated();
      } catch (error) {
        console.error("Erro ao deletar produto", error);
        alert("Ocorreu um erro ao tentar excluir o produto.");
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {product.descricao}
        </h3>
        <p className="text-base text-gray-600">Código: {product.codigo}</p>
      </div>
      <div className="px-4 pt-3 pb-4 bg-gray-50 sm:flex sm:flex-row sm:justify-between">
        <div className="flex justify-end space-x-2 mt-3 sm:mt-0">
          <div className="flex items-center justify-start max-sm:mr-20  mr-52 ">
            <button
              onClick={() => setShowDetailsModal(true)}
              className="text-green-600 hover:text-green-700 bg-transparent border border-green-600 hover:border-green-700 py-1 px-3 rounded-md text-base font-medium"
            >
              Detalhes
            </button>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-blue-600 hover:text-blue-700 bg-transparent border border-blue-600 hover:border-blue-700 py-1 px-3 rounded-md text-base font-medium"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 bg-transparent border border-red-600 hover:border-red-700 py-1 px-3 rounded-md text-base font-medium"
          >
            Excluir
          </button>
        </div>
      </div>
      {showEditModal && (
        <EditProductModal
          product={product}
          onClose={() => setShowEditModal(false)}
          onProductUpdated={() => {
            onProductUpdated();
            setShowEditModal(false);
          }}
        />
      )}
      {showDetailsModal && (
        <ProductDetails
          product={product}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default Product;
