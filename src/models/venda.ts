import { Produto } from "./produto";

interface VendaProdutos {
  quantidade: number;
  produto: {
    idProduto: number;
    nome?: string;
  }
}

export interface Venda {
    idVenda?: number;
    dataVenda: string;
    status: string;
    observacao: string;
    vendaProdutos: VendaProdutos[];
  }
  