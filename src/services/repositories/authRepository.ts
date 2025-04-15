import api from '../clients/axios';

const resource: string = '/api/v1/auth';

export interface LoginResponse {
  access_token: string;
  expires_in: string;
  force_password_reset: boolean;
  token_type: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ChangePasswordPayload {
  new_password: string;
  confirm_password: string;
}

export interface AuthRequests {
  login(body: LoginPayload): Promise<LoginResponse>;
  changePassword(body: ChangePasswordPayload): Promise<void>;
}

export default <AuthRequests>{
  async login(body: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(`${resource}/login`, body);
    return response.data;
  },

  async changePassword(body: ChangePasswordPayload): Promise<void> {
    await api.post<void>(`${resource}/change-password`, body);
  },
};