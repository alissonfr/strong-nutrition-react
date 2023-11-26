import { Produto } from "../models/produto";
import { Api } from "./axios-config";

export const findProduto = async (page?: number, pageSize?: number, nome?: string, marca?: string) => {
  try {
    const response = await Api.get(`/produto?page=${page || ""}&pageSize=${pageSize || ""}&nome=${nome || ""}&marca=${marca || ""}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findProdutoById = async (id: number) => {
  try {
    const response = await Api.get(`/produto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduto = async (produto: Produto) => {
  try {
    const response = await Api.post("/produto", produto);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduto = async (id: number, produto: Produto) => {
  try {
    delete produto.idProduto;
    const response = await Api.put(`/produto/${id}`, produto);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduto = async (idProduto: number) => {
  try {
    const response = await Api.delete(`/produto/${idProduto}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
