import React, { useState } from "react";
import { ProductService } from "@/pages/api/api";

interface CreateProductModalProps {
  onClose: () => void;
  onProductCreated: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  onClose,
  onProductCreated,
}) => {
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handleCreate = async () => {
    if (!descricao || preco === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await ProductService.createProduct({
        descricao,
        preco: parseFloat(preco),
      });
      onProductCreated();
      onClose();
    } catch (error) {
      console.error("Erro ao criar produto", error);
      alert("Ocorreu um erro ao tentar criar o produto.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <h3
            className="text-xl leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Criar Novo Produto
          </h3>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-base"
            />
            <input
              type="number"
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="mt-4 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-base"
              step="0.01"
            />
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-base"
              onClick={handleCreate}
            >
              Criar
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

export default CreateProductModal;
