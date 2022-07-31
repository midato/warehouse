export interface SaleListResponse {
  log: string;
  err_bool: number;
  ventas: Venta[];
}

export interface Venta {
  id: string;
  id_cliente: string;
  id_almacen: string;
  id_user: string;
  total: string;
  fecha: Date;
  productos: Producto[];
}

export interface Producto {
  id: string;
  id_producto: string;
  producto: string;
  id_venta: string;
  cantidad: string;
  precio: string;
  presentacion: string;
  id_unidad: string;
}
