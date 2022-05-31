import { Injectable } from '@angular/core';
import { TokenRequest } from '../../anonymous/interfaces/token-request.interface';
import { TokenResponse } from '../../anonymous/interfaces/token-response.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { StockRequest } from '../interfaces/stock-request.interface';
import { StockResponse } from '../interfaces/stock-response.interface';
import { StockListResponse } from '../interfaces/stock-list-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  NG_APP_EWH_BASE_URL = environment.NG_APP_EWH_BASE_URL;
  NG_APP_EWH_PREFIX = environment.NG_APP_EWH_PREFIX;

  redirectUrl = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  retrieveStock(body: any): Promise<StockListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/get_almacenes/`;
    // const headers = new HttpHeaders()
      // .set('Access-Control-Allow-Headers', 'true');
      // .set('x-id-acceso', `${ this.getAccessId() }`)
      // .set('x-api-key', `${this.getApikey()}`);
    // console.log(headers);
    // return this.http.post<StockResponse>(baseUrl, body, {headers}).toPromise();
    return this.http.post<StockListResponse>(baseUrl, body).toPromise();
  }

  saveStock(body: StockRequest): Promise<StockResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/agregar_almacen`;
    // const headers = new HttpHeaders()
      // .set('Access-Control-Allow-Headers', 'true');
      // .set('x-id-acceso', `${ this.getAccessId() }`)
      // .set('x-api-key', `${this.getApikey()}`);
    // console.log(headers);
    // return this.http.post<StockResponse>(baseUrl, body, {headers}).toPromise();
    return this.http.post<StockResponse>(baseUrl, body).toPromise();
  }
}
