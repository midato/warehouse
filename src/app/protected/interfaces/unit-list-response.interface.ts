export interface UnitListResponse {
  log: string;
  err_bool: number;
  unidades: Unidad[];
}

export interface Unidad {
  id: string;
  nombre: string;
  unidad_base: string;
  cant_base: string;
}
