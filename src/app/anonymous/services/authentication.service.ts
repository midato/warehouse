import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { TokenRequest } from '../interfaces/token-request.interface';
import { TokenAddResponse } from '../interfaces/token-add-response.interface';
import { TokenRemoveResponse } from '../interfaces/token-remove-response.interface';

const CRYPTO_TOKEN = 'crypto_token';
const KEYS = '_unknown';
const API_KEY = '_ak';

// const TOKEN = 'token';
// const EXPIRES_IN = 'expiresIn';
const ACCESS_ID = 'idAcceso';

const USER_ID = 'pk';
const USER_NAME = 'userName';
const USER_ROLE = 'userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  NG_APP_EWH_BASE_URL = environment.NG_APP_EWH_BASE_URL;
  NG_APP_EWH_VERSION = environment.NG_APP_EWH_VERSION;

  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  /*saveCryptoToken(token: string): void {
    sessionStorage.setItem(CRYPTO_TOKEN, token);
  }

  getCryptoToken(): string {
    return <string>sessionStorage.getItem(CRYPTO_TOKEN);
  }*/

  removeCryptoToken(): void {
    sessionStorage.removeItem(CRYPTO_TOKEN);
  }

  /*saveAccessId(accessId: string): void {
    sessionStorage.setItem(ACCESS_ID, accessId);
  }

  getAccessId() {
    return <string>sessionStorage.getItem(ACCESS_ID);
  }*/

  removeAccessId(): void {
    sessionStorage.removeItem(ACCESS_ID);
  }

  saveUserId(userId: string): void {
    sessionStorage.setItem(USER_ID, userId);
  }

  /*getUserId() {
    return <string>sessionStorage.getItem(USER_ID);
  }*/

  removeUserId(): void {
    sessionStorage.removeItem(USER_ID);
  }

  saveApikey(apiKey: string): void {
    sessionStorage.setItem(API_KEY, apiKey);
  }

  getApikey() {
    return <string>sessionStorage.getItem(API_KEY);
  }

  removeApikey(): void {
    sessionStorage.removeItem(API_KEY);
  }

  saveUsername(email: string): void {
    localStorage.setItem(USER_NAME, email);
  }

  /*getUsername(): string {
    return <string>localStorage.getItem(USER_NAME);
  }*/

  removeUsername(): void {
    localStorage.removeItem(USER_NAME);
  }

  saveUserRole(userRole: string): void {
    localStorage.setItem(USER_ROLE, userRole);
  }

  /*getUserRole(): string {
    const userRole = <string>localStorage.getItem(USER_ROLE);
    let u = '';
    if (userRole) {
      u = userRole.replace('_', ' ').split('')
        .map((c, i) => i ? c.toLowerCase() : c.toUpperCase())
        .join('');
    }
    return u;
  }*/

  /*getSesionRole(): string {
    return <string>localStorage.getItem(USER_ROLE);
  }*/

  removeUserRole(): void {
    localStorage.removeItem(USER_ROLE);
  }

  removeSecurityKeys(): void {
    localStorage.removeItem(KEYS);
  }

  isTokenExpired(): boolean {
    if (this.getApikey().length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expiresIn'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  login(body: LoginRequest): Observable<LoginResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/acceso/login/login/`;
    return this.http.post<LoginResponse>(baseUrl, body);
  }

  async logout() {
    this.removeApikey();
    this.removeUserId();
    this.removeUsername();
    this.removeUserRole();
    this.removeSecurityKeys();
    this.removeCryptoToken();
    this.removeAccessId();
    await this.router.navigateByUrl('/login');
  }

  tokenAdd(body: TokenRequest): Promise<TokenAddResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/tokens/tokens/obtener_token_agregar`;
    const headers = new HttpHeaders()
      // .set('Access-Control-Allow-Headers', 'true');
      // .set('x-id-acceso', `${ this.getAccessId() }`)
      .set('x-api-key', `${this.getApikey()}`);
    // console.log(headers);
    return this.http.post<TokenAddResponse>(baseUrl, body, {headers}).toPromise();
    // return this.http.post<TokenAddResponse>(baseUrl, body);
  }

  tokenEdit(body: TokenRequest): Promise<TokenAddResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/tokens/tokens/obtener_token_editar`;
    const headers = new HttpHeaders()
      .set('x-api-key', `${this.getApikey()}`);
    return this.http.post<TokenAddResponse>(baseUrl, body, {headers}).toPromise();
  }

  tokenRemove(body: TokenRequest): Promise<TokenRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/tokens/tokens/obtener_token_borrar`;
    const headers = new HttpHeaders()
      .set('x-api-key', `${this.getApikey()}`);
    return this.http.post<TokenRemoveResponse>(baseUrl, body, {headers}).toPromise();
  }

}
