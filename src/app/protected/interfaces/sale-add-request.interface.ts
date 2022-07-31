export interface SaleAddRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  add_data: AddData;
  add_token: string;
}

export interface AddData {
  venta: Venta;
  productos: Producto[];
}

export interface Producto {
  id_producto: string;
  producto: string;
  cantidad: string;
  precio: string;
  presentacion: string;
  id_unidad: string;
}

export interface Venta {
  id_cliente: string;
  id_almacen: string;
  id_user: string;
  total: string;
  fecha: string;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
