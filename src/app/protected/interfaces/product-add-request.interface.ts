export interface ProductAddRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  add_data: AddData;
  add_token: string;
}

export interface AddData {
  producto: string;
  id_prov: number;
  id_clasif: number;
  max: number;
  min: number;
  existencias: number;
  presentacion: string;
  id_unidad: number;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
