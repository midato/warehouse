export interface LoginResponse {
  log: string;
  err_bool: number;
  usuario: Usuario[];
}

export interface Usuario {
  id_user: string;
  usr_profile_name: string;
  usr_name: string;
  usr_mail: string;
  foto: string;
  tipo_usuario: string;
  user_api_key: string;
}
