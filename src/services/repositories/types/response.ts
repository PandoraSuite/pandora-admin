export interface StandardResponse<T> {
  data?: T;
  error?: any;
  success: boolean;
}
