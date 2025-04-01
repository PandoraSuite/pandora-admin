// ! Estos son datos de ejemplo. Una vez definidos los servicios Pandora en backend, escribir aquí los métodos a lugar.

import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el usuario');
  }
};
