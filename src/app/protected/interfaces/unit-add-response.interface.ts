export interface UnitAddResponse {
  log: Log;
  err_bool: number;
  ins_unidad: InsUnidad;
}

export interface InsUnidad {
  error: number;
  error_desc: string;
  unidad_added: number;
  unidad_added_id: number;
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
  unidad_base: number;
  cant_base: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
