export interface StockResponse {
  log: Log;
  err_bool: number;
  ins_almacen: InsAlmacen;
}

export interface InsAlmacen {
  error: number;
  error_desc: string;
  almacen_added: number;
  almacen_added_id: number;
  deleted_token: number;
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
  descripcion: string;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
