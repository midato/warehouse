export interface SaleListRequest {
  json: JSON;
}

export interface JSON {
  user_id: string;
  id: number;
  limit: number;
  offset: number;
}
