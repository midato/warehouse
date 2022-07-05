export interface UnitRemoveResponse {
  log: InputArray;
  err_bool: number;
  'input array': InputArray;
  delunidad: Delunidad;
}

export interface Delunidad {
  error: number;
  error_desc: string;
  unidad_deleted: number;
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
  id: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
