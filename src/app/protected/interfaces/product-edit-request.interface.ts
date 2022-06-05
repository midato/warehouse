export interface ProductEditRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  edit_data: EditData;
  edit_token: string;
}

export interface EditData {
  id_prod: number;
  producto: string;
  id_prov: number;
  id_clasif: number;
  max: number;
  min: number;
  existencias: number;
  presentacion: string;
  unidad: string;
  estatus: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
