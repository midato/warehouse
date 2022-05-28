import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
// import { UserAgent } from '../../shared/interfaces/user-agent.interface';
// import { PasswordForgot, PasswordForm } from '../interfaces/password-forgot.interface';
// import { PasswordResponse } from '../interfaces/password-response.interface';
// import { AgentSearchForm } from '../../admin/interfaces/agent-search-form.interface';


import { environment } from '../../../environments/environment';

const CRYPTO_TOKEN = 'crypto_token';
const KEYS = '_unknown';

const TOKEN = 'token';
const EXPIRES_IN = 'expiresIn';
const ACCESS_ID = 'idAcceso';

// const USER_NAME = 'correoElectronico';
const USER_NAME = 'userName';
const USER_ROLE = 'userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  NG_APP_EWH_BASE_URL = environment.NG_APP_EWH_BASE_URL;
  NG_APP_EWH_PREFIX = environment.NG_APP_EWH_PREFIX;

  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  saveCryptoToken(token: string): void {
    sessionStorage.setItem(CRYPTO_TOKEN, token);
  }

  getCryptoToken(): string {
    return <string>sessionStorage.getItem(CRYPTO_TOKEN);
  }

  removeCryptoToken(): void {
    sessionStorage.removeItem(CRYPTO_TOKEN);
  }

  saveAccessId(accessId: string): void {
    sessionStorage.setItem(ACCESS_ID, accessId);
  }

  getAccessId() {
    return <string>sessionStorage.getItem(ACCESS_ID);
  }

  removeAccessId(): void {
    sessionStorage.removeItem(ACCESS_ID);
  }

  saveToken(token: string): void {
    sessionStorage.setItem(TOKEN, token);

    const hoy = new Date();
    hoy.setSeconds(3599);
    localStorage.setItem(EXPIRES_IN, hoy.getTime().toString());
  }

  getToken(): string {
    return <string>sessionStorage.getItem(TOKEN);
  }

  removeToken(): void {
    sessionStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRES_IN);
  }

  saveUsername(email: string): void {
    localStorage.setItem(USER_NAME, email);
  }

  getUsername(): string {
    return <string>localStorage.getItem(USER_NAME);
  }

  removeUsername(): void {
    localStorage.removeItem(USER_NAME);
  }

  saveUserRole(userRole: string): void {
    localStorage.setItem(USER_ROLE, userRole);
  }

  getUserRole(): string {
    const userRole = <string>localStorage.getItem(USER_ROLE);
    let u = '';
    if (userRole) {
      u = userRole.replace('_', ' ').split('')
        .map((c, i) => i ? c.toLowerCase() : c.toUpperCase())
        .join('');
    }
    return u;
  }

  getSesionRole(): string {
    return <string>localStorage.getItem(USER_ROLE);
  }

  removeUserRole(): void {
    localStorage.removeItem(USER_ROLE);
  }

  removeSecurityKeys(): void {
    localStorage.removeItem(KEYS);
  }

  isTokenExpired(): boolean {
    if (this.getToken().length < 2) {
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
    const baseUrl = `${ this.NG_APP_EWH_BASE_URL }${ this.NG_APP_EWH_PREFIX }/index.php/acceso/login/login/`;
    /* console.log(baseUrl); */
    // @ts-ignore
    // delete body.esRecuerdame;
    /* console.log(body); */

    // const headers = new HttpHeaders()
    //   .set('Access-Control-Allow-Headers', 'true');
    // .set('x-id-acceso', `${ this.getAccessId() }`)
    // .set('Authorization', `Bearer ${ this.getToken() }`);
    // console.log(headers);
    // return this.http.post<LoginResponse>(baseUrl, body, { headers });
    return this.http.post<LoginResponse>(baseUrl, body);
    /*return this.http.post(baseUrl, body)
      .pipe(
        tap(async (response: any) => {
          console.log(response);
          this.saveToken(response.resultado.tokenAcceso);
        })
      );*/
  }

  async logout() {
    this.removeToken();
    this.removeUsername();
    this.removeUserRole();
    // this.removeAccessResponse();
    this.removeSecurityKeys();
    this.removeToken();
    this.removeCryptoToken();
    this.removeAccessId();
    await this.router.navigateByUrl('/landing');
  }

  // postForgot(passwordForgot: PasswordForgot): Observable<PasswordResponse> {
  //   const baseUrl = `${ this.NG_APP_EWH_BASE_URL }${ this.NG_APP_EWH_PREFIX }${ this.NG_APP_EWH_AGENTS }${ this.NG_APP_EWH_VERSION }/agentes/recuperacion-contrasenia`;
  //   const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${ this.getToken() }`);
  //   /* .set('x-token-acceso-temporal', `${TOKEN}`); */
  //   /* console.log(headers); */
  //   return this.http.post<PasswordResponse>(baseUrl, { ...passwordForgot }, { headers });
  // }

  // postPass(passwordReset: PasswordForm): Observable<PasswordResponse> {
  //   const baseUrl = `${ this.NG_APP_EWH_BASE_URL }${ this.NG_APP_EWH_PREFIX }${ this.NG_APP_EWH_AGENTS }${ this.NG_APP_EWH_VERSION }/agentes/recuperacion-contrasenias`;
  //   const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${ this.getToken() }`)
  //     .set('x-token-acceso-temporal', `${ TOKEN }`);
  //   /* console.log(headers); */
  //   return this.http.post<PasswordResponse>(baseUrl, { ...passwordReset }, { headers });
  // }

  // postEditPass(passwordReset: PasswordForm, xtokentemporal: string): Observable<PasswordResponse> {
  //   const baseUrl = `${ this.NG_APP_EWH_BASE_URL }${ this.NG_APP_EWH_PREFIX }${ this.NG_APP_EWH_AGENTS }${ this.NG_APP_EWH_VERSION }/agentes/contrasenias`;
  //   const headers = new HttpHeaders()
  //     .set('Authorization', `Bearer ${ this.getToken() }`)
  //     .set('x-id-acceso', `${ this.getAccessId() }`)
  //     .set('x-token-acceso-temporal', `${ xtokentemporal }`);
  //   return this.http.put<PasswordResponse>(baseUrl, { ...passwordReset }, { headers });
  // }


  // getUser(agentSearchForm: AgentSearchForm): Observable<UserAgent> {
  //   const baseUrl = `${ this.NG_APP_EWH_BASE_URL }${ this.NG_APP_EWH_PREFIX }${ this.NG_APP_EWH_MANAGER }${ this.NG_APP_EWH_VERSION }/agentes/detalles/busquedas`;
  //   // return this.http.get(`${this.NG_APP_EWH_BASE_URL_DASHBOARD_MGM_API}/mock/agentes/${agentId}`)
  //   return this.http.post(`${ baseUrl }`, agentSearchForm)
  //     .pipe(
  //       tap((response: any) => {
  //         /* console.log(response); */
  //         return response;
  //       })
  //     );
  // }

}
