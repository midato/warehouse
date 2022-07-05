export interface UnitEditResponse {
  log: Log;
  err_bool: number;
  edit_unidad: EditUnidad;
}

export interface EditUnidad {
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
  unidad_base: number;
  cant_base: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
