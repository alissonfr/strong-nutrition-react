import { Cliente } from "./cliente";
import { User } from "./user";

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
    cliente: Cliente;
    funcionario: User;
    vendaProdutos: VendaProdutos[];
  }
  