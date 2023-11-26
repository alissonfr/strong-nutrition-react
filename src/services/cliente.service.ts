import { Cliente } from '../models/cliente';
import { Api } from './axios-config';

export const getClienteById = async (id: number) => {
  try {
    const response = await Api.get(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findClientes = async (page?: number, pageSize?: number, nome?: string, email?: string) => {
    try {
      const response = await Api.get(`/cliente?page=${page || ""}&pageSize=${pageSize || ""}&nome=${nome || ""}&email=${email || ""}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const createCliente = async (cliente: Cliente) => {
  try {
    const response = await Api.post('/cliente', cliente);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCliente = async (id: number, cliente: Cliente) => {
  try {
    delete cliente.idCliente;
    const response = await Api.put(`/cliente/${id}`, cliente);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCliente = async (id: number) => {
  try {
    const response = await Api.delete(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};