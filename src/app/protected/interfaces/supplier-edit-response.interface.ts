export interface SupplierEditResponse {
  log: Log;
  err_bool: number;
  edit_proveedor: EditProveedor;
}

export interface EditProveedor {
  error: number;
  error_desc: string;
}

export interface Log {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  edit_data: EditData;
  edit_token: string;
}

export interface EditData {
  id_prov: number;
  nombre: string;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
