import React from "react";
import { Product } from "@/interfaces/Product.interface";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h2
                className="text-2xl leading-6 font-medium text-gray-900 pb-2"
                id="modal-title"
              >
                Detalhes do Produto
              </h2>

              <div className="mt-2">
                <p className="text-base text-gray-500">
                  Veja mais informações sobre o produto selecionado.
                </p>
                <ul className="mt-3 list-disc list-inside text-base text-gray-700">
                  <li>
                    <strong>Código:</strong> {product.codigo}
                  </li>
                  <li>
                    <strong>Descrição:</strong> {product.descricao}
                  </li>
                  <li>
                    <strong>Preço:</strong> R$ {product.preco.toFixed(2)}
                  </li>
                  <li>
                    <strong>Data de Cadastro:</strong>{" "}
                    {new Date(product.data_cadastro!).toLocaleDateString()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-base"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
