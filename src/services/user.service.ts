import { User } from '../models/user';
import { Api } from './axios-config';

export const getUserById = async (id: number) => {
  try {
    const response = await Api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const find = async () => {
    try {
      const response = await Api.get(`/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const createUser = async (user: User) => {
  try {
    const response = await Api.post('/user', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: number, user: User) => {
  try {
    const response = await Api.put(`/user/${id}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await Api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};