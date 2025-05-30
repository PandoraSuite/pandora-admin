export interface APIKey {
  created_at: string;
  environment_id: number;
  expires_at: string;
  id: number;
  key: string;
  last_used: string;
  status: string;
}
[];

export interface APIKeyToRender {
  created_at: string;
  environment_id: string;
  expires_at: string;
  id: number;
  key: string;
  last_used: string;
  status: string;
}
[];

export interface NewAPIKey {
  environment_id: number;
  expires_at: string;
}
