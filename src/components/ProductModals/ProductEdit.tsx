import React, { useState } from "react";
import { Product } from "@/interfaces/Product.interface";
import { ProductService } from "@/pages/api/api";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  onProductUpdated,
}) => {
  const [descricao, setDescricao] = useState(product.descricao);
  const [preco, setPreco] = useState<number>(product.preco);

  const handleUpdate = async () => {
    if (!descricao || preco <= 0) {
      alert("Por favor, preencha todos os campos ou verifique os valores.");
      return;
    }
    try {
      await ProductService.updateProduct(product.codigo, {
        descricao,
        preco: preco,
      });
      onClose();
      onProductUpdated();
    } catch (error) {
      console.error("Erro ao atualizar o produto", error);
      alert("Ocorreu um erro ao tentar editar o produto.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              Editar Produto
            </h3>
            <div className="mt-4">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="descricao"
                    className="block text-base font-medium text-gray-700 "
                  >
                    Descrição
                  </label>
                  <input
                    type="text"
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="preco"
                    className="block text-base font-medium text-gray-700"
                  >
                    Preço
                  </label>
                  <input
                    type="number"
                    id="preco"
                    value={preco.toString()}
                    onChange={(e) => setPreco(parseFloat(e.target.value))}
                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-base"
              onClick={handleUpdate}
            >
              Salvar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-base"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
