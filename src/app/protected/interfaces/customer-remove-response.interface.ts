export interface CustomerRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delcliente: Delcliente;
}

export interface Delcliente {
  error: number;
  error_desc: string;
  cliente_deleted: number;
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
  id_clie: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
