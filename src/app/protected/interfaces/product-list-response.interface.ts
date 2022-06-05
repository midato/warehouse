export interface ProductListResponse {
  log: string;
  err_bool: number;
  productos: Producto[];
}

export interface Producto {
  id_prod: string;
  producto: string;
  id_prov: string;
  id_clasif: string;
  max: string;
  min: string;
  existencias: string;
  presentacion: string;
  unidad: string;
  estatus: string;
}
