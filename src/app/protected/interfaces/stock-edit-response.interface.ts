export interface StockEditResponse {
  log: Log;
  err_bool: number;
  edit_almacen: EditAlmacen;
}

export interface EditAlmacen {
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
  id: number;
  nombre: string;
  descripcion: string;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
