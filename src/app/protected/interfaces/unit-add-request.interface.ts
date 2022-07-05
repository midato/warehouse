export interface UnitAddRequest {
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
