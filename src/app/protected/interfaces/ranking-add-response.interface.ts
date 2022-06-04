export interface RankingAddResponse {
  log:               Log;
  err_bool:          number;
  ins_clasificacion: InsClasificacion;
}

export interface InsClasificacion {
  error:                  number;
  error_desc:             string;
  clasificacion_added:    number;
  clasificacion_added_id: number;
  deleted_token:          number;
}

export interface Log {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  add_data:  AddData;
  add_token: string;
}

export interface AddData {
  clasificacion: string;
  status:        number;
}

export interface UserData {
  id_user:     number;
  user_active: number;
}
