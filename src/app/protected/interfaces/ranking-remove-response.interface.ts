export interface RankingRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delclasificacion: Delclasificacion;
}

export interface Delclasificacion {
  error: number;
  error_desc: string;
  clasificacion_deleted: number;
  deleted_token: number;
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
  id_clasif: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
