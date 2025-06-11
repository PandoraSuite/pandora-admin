export interface Service {
  created_at: string;
  id: number;
  name: string;
  status: string;
  version: string;
}

export interface NewService {
  name: string;
  version: string;
}

export interface UpdateService {
  name?: string;
  version?: string;
}

export interface UpdateServiceStatus {
  status: string;
}

export interface ServicePayload {
  name: string;
  version: string;
}

export interface ServiceFilterParams {
  status?: string;
}

export interface ServiceRequestsHistory {
  execution_status?: string;
  request_time_from?: string;
  request_time_to?: string;
}

export interface ServiceRequestsHistoryResponse {
  api_key: {
    id: number;
    key: string;
  };
  created_at: string;
  environment: {
    id: number;
    name: string;
  };
  execution_status: string;
  id: string;
  ip_address: string;
  method: string;
  path: string;
  project: {
    id: number;
    name: string;
  };
  request_time: string;
  service: {
    id: number;
    name: string;
    version: string;
  };
  start_point: string;
  status_code: number;
  unauthorized_reason: string;
}
[];
