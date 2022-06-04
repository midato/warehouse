export interface SupplierListResponse {
  log: string;
  err_bool: number;
  proveedores: Proveedor[];
}

export interface Proveedor {
  id_prov: string;
  nombre: string;
  estatus: string;
}
