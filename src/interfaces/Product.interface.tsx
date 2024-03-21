export interface Product {
  codigo: number;
  descricao: string;
  preco: number;
  data_cadastro?: string;
}

export interface ProductItem {
  codigo: number;
  descricao: string;
  preco: number;
}
