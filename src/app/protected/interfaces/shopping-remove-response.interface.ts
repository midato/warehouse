export interface ShoppingRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delcompra: Delcompra;
}

export interface Delcompra {
  error: number;
  error_desc: string;
  warning: string;
}

export interface InputArray {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  del_data: DelData;
  del_token: string;
}

export interface DelData {
  id: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
