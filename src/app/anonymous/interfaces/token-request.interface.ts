export interface TokenRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
