export interface StockRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delalmacen: Delalmacen;
}

export interface Delalmacen {
  error: number;
  error_desc: string;
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
