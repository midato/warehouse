export interface RankingEditResponse {
  log: Log;
  err_bool: number;
  edit_clasificacion: EditClasificacion;
}

export interface EditClasificacion {
  error: number;
  error_desc: string;
  clasificacion_edited: number;
  deleted_token: number;
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
  id_clasif: number;
  clasificacion: string;
  status: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
