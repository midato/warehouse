export interface SaleRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delventa: Delventa;
}

export interface Delventa {
  error: number;
  error_desc: string;
  venta_deleted: number;
  deleted_token: number;
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
