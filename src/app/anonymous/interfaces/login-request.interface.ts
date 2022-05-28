export interface LoginRequest {
  json: JSON;
}

export interface JSON {
  usr_name: string;
  usr_pass: string;
}


/*class LoginRequest_ {
  // protected name: string;
  protected json: JSON;

  constructor(username: string, password: string) {
    this.json.usr_name = username;
    this.json.usr_pass = password;
  }
}*/
