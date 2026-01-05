export interface StandardResponse<T> {
  data?: T;
  status?: string;
  error?: any;
  success: boolean;
}
