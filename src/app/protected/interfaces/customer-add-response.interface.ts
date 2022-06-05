export interface CustomerAddResponse {
  log: Log;
  err_bool: number;
  ins_cliente: InsCliente;
}

export interface InsCliente {
  error: number;
  error_desc: string;
}

export interface Log {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  add_data: AddData;
  add_token: string;
}

export interface AddData {
  nombre: string;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
