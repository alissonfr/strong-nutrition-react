import { Fornecedor } from "../models/fornecedor";
import { Api } from "./axios-config";

export const findFornecedor = async (
  page: number,
  pageSize: number,
  nomeFantasia: string,
  razaoSocial: string
) => {
  try {
    const response = await Api.get(
      `/fornecedor?page=${page}&pageSize=${pageSize}&nomefantasia=${nomeFantasia}&razaosocial=${razaoSocial}`
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
    delete fornecedor.codFornecedor;
    const response = await Api.put(`/fornecedor/${id}`, fornecedor);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFornecedor = async (codFornecedor: number) => {
  try {
    const response = await Api.delete(`/fornecedor/${codFornecedor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
