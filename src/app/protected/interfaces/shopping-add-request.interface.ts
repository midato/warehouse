export interface ShoppingAddRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  add_data: AddData;
  add_token: string;
}

export interface AddData {
  compra: Compra;
  productos: Producto[];
}

export interface Compra {
  id_proveedor: string;
  id_almacen: string;
  id_user: string;
  total: string;
  fecha: string;
}

export interface Producto {
  id_producto: string;
  producto: string;
  cantidad: string;
  precio: string;
  presentacion: string;
  id_unidad: string;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
