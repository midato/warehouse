export interface SupplierRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delproveedor: Delproveedor;
}

export interface Delproveedor {
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
  id_prov: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
