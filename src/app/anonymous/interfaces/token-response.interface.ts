export interface TokenResponse {
  log: string;
  err_bool: number;
  token_error: boolean;
  add_token: string;
  data: Data;
}

export interface Data {
  user_data: UserData;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
