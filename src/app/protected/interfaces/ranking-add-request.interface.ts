export interface RankingAddRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  add_data: AddData;
  add_token: string;
}

export interface AddData {
  clasificacion: string;
  status: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
