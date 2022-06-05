export interface ProductAddResponse {
  log: Log;
  err_bool: number;
  ins_producto: InsProducto;
}

export interface InsProducto {
  error: number;
  error_desc: string;
  producto_added: number;
  producto_added_id: number;
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
