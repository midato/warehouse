export interface CustomerEditResponse {
  log: Log;
  err_bool: number;
  edit_cliente: EditCliente;
}

export interface EditCliente {
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
  id_clie: number;
  nombre: string;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
