import { Fornecedor } from "../models/fornecedor";
import { Api } from "./axios-config";

export const findFornecedor = async (
  page: number,
  pageSize: number,
  nomeFantasia: string,
  cnpj: string
) => {
  try {
    const response = await Api.get(
      `/fornecedor?page=${page}&pageSize=${pageSize}&nomeFantasia=${nomeFantasia}&cnpj=${cnpj}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFornecedor = async (fornecedor: Fornecedor) => {
  try {
    const response = await Api.post("/fornecedor", fornecedor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFornecedor = async (id: number, fornecedor: Fornecedor) => {
  try {
    delete fornecedor.idFornecedor;
    const response = await Api.put(`/fornecedor/${id}`, fornecedor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFornecedor = async (idFornecedor: number) => {
  try {
    const response = await Api.delete(`/fornecedor/${idFornecedor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
