export interface ProductRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delproducto: Delproducto;
}

export interface Delproducto {
  error: number;
  error_desc: string;
  producto_deleted: number;
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
  id_prod: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
