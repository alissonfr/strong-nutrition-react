import { Produto } from "./produto";

export interface Venda {
    idVenda?: number;
    cliente: string;
    codigo: string;
    dataDaVenda: string;
    estadoDaVenda: string;
    observacao: string;
    produto: Partial<Produto>;
  }
  