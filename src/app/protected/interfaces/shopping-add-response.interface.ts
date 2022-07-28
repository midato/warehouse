export interface ShoppingAddResponse {
  log: string;
  err_bool: number;
  ins_compra: InsCompra;
}

export interface InsCompra {
  error: number;
  error_desc: string;
  compra_added: number;
  productos: boolean[];
  compra_added_id: number;
  deleted_token: number;
}
