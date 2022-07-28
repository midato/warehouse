export interface ShoppingEditRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  edit_data: EditData;
  edit_token: string;
}

export interface EditData {
  id_compra: string;
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
