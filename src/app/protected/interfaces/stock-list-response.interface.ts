export interface StockListResponse {
  log: string;
  err_bool: number;
  almacenes: Almacen[];
}

export interface Almacen {
  id: string;
  nombre: string;
  descripcion: string;
  estatus: string;
}
