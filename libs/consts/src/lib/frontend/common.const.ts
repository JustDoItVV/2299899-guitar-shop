export const BACKEND_URL = 'http://localhost:3001/api';
export const REQUEST_TIMEOUT = 5000;

export enum ApiRoute {
  UserRegister = '/user/register',
  UserLogin = '/user/login',
  UserCheck = '/user/check',
  UserRefresh = '/user/refresh',
}
