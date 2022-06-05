export interface CustomerRemoveRequest {
  json: JSON;
}

export interface JSON {
  user_data: UserData;
  del_data: DelData;
  del_token: string;
}

export interface DelData {
  id_clie: number;
}

export interface UserData {
  id_user: number;
  user_active: number;
}
