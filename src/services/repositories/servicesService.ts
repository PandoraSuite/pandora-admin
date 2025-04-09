import axios from "axios";

import api from "../clients/axios";

const URL: string = "/api/v1";

export interface Services {
  created_at: string;
  id: number;
  name: string;
  status: string;
  version: string;
  error: string;
}

export interface NewService {
  name: string;
  version: string;
}

export const getServices = async (): Promise<Services[]> => {
  try {
    const response = await api.get<Services[]>(`${URL}/services`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error getting services: ${error.message}`);
    } else {
      throw new Error("Unexpected error while obtaining services.");
    }
  }
};

export const createService = async (body: NewService): Promise<Services> => {
  try {
    const response = await api.post<Services>(`${URL}/services`, body);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error creating service: ${error.message}`);
    } else {
      throw new Error("Unexpected error while creating service");
    }
  }
};
