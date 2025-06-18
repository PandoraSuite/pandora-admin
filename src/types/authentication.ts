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

export interface ReauthenticatesPayload {
  action: string;
  password: string;
}

export interface ReauthenticatesResponse {
  access_token: string;
  expires_in: string;
  token_type: string;
}
