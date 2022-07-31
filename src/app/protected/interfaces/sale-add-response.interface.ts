export interface SaleAddResponse {
  log: string;
  err_bool: number;
  ins_venta: InsVenta;
}

export interface InsVenta {
  error: number;
  error_desc: string;
  venta_added: number;
  productos: boolean[];
  venta_added_id: number;
  deleted_token: number;
}
