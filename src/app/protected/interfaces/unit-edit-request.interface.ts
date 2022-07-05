export interface UnitEditRequest {
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
