export interface SaleEditResponse {
  log: string;
  err_bool: number;
  ins_venta: InsVenta;
}

export interface InsVenta {
  error: number;
  error_desc: string;
  productos: boolean[];
  venta_edited: number;
  deleted_token: number;
}
