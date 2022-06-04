export interface RankingListResponse {
  log: string;
  err_bool: number;
  clasificaciones: Clasificacion[];
}

export interface Clasificacion {
  id_clasif: string;
  clasificacion: string;
  status: string;
}
