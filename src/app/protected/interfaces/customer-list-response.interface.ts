export interface CustomerListResponse {
  log: string;
  err_bool: number;
  clientes: Cliente[];
}

export interface Cliente {
  id_clie: string;
  nombre: string;
  estatus: string;
}
