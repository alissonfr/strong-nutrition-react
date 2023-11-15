import { Fornecedor } from "./fornecedor";

export interface Produto {
  idProduto?: number;
  nome: string;
  descricao: string;
  marca: string;
  preco: string;
  fornecedor: Partial<Fornecedor>;
}
