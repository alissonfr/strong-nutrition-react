import { Venda } from "../models/venda";
import { Api } from "./axios-config";

export const findVenda = async (page?: number, pageSize?: number, observacao?: string) => {
  try {
    const response = await Api.get(`/venda?page=${page || ""}&pageSize=${pageSize || ""}&observacao=${observacao || ""}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVenda = async (venda: Venda) => {
    try {

      const user = localStorage.getItem("user");
      if(user) {
        venda.funcionario = JSON.parse(user);
      }

      const response = await Api.post("/venda", venda);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateVenda = async (id: number, venda: Venda) => {
    try {
      delete venda.idVenda;
      const response = await Api.put(`/venda/${id}`, venda);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const deleteVenda = async (idVenda: number) => {
    try {
      const response = await Api.delete(`/venda/${idVenda}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };