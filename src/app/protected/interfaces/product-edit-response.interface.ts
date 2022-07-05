export interface ProductEditResponse {
  log: Log;
  err_bool: number;
  edit_producto: EditProducto;
}

export interface EditProducto {
  error: number;
  error_desc: string;
  producto_edited: number;
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
  id_prod: number;
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
