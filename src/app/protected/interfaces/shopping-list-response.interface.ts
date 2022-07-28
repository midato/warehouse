export interface ShoppingListResponse {
  log: string;
  err_bool: number;
  compras: Compra[];
}

export interface Compra {
  id: string;
  id_proveedor: string;
  id_almacen: string;
  id_producto: string;
  id_user: string;
  total: string;
  fecha: Date;
  productos: Producto[];
}

export interface Producto {
  id: string;
  id_producto: string;
  producto: string;
  id_compra: string;
  cantidad: string;
  precio: string;
  presentacion: string;
  id_unidad: string;
}
