export interface ShoppingEditResponse {
  log: string;
  err_bool: number;
  ins_compra: InsCompra;
}

export interface InsCompra {
  error: number;
  error_desc: string;
  productos: boolean[];
  compra_edited: number;
  deleted_token: number;
}
