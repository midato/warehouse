import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { StockAddRequest } from '../interfaces/stock-add-request.interface';
import { StockAddResponse } from '../interfaces/stock-add-response.interface';
import { StockListResponse } from '../interfaces/stock-list-response.interface';
import { StockEditRequest } from '../interfaces/stock-edit-request.interface';
import { StockEditResponse } from '../interfaces/stock-edit-response.interface';
import { StockRemoveRequest } from '../interfaces/stock-remove-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  NG_APP_EWH_BASE_URL = environment.NG_APP_EWH_BASE_URL;
  NG_APP_EWH_PREFIX = environment.NG_APP_EWH_PREFIX;

  redirectUrl = '';

  constructor(
    private http: HttpClient
  ) {
  }

  retrieveStock(body: any): Promise<StockListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/get_almacenes/`;
    // const headers = new HttpHeaders()
    // .set('Access-Control-Allow-Headers', 'true');
    // .set('x-id-acceso', `${ this.getAccessId() }`)
    // .set('x-api-key', `${this.getApikey()}`);
    // console.log(headers);
    // return this.http.post<StockAddResponse>(baseUrl, body, {headers}).toPromise();
    return this.http.post<StockListResponse>(baseUrl, body).toPromise();
  }

  saveStock(body: StockAddRequest): Promise<StockAddResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/agregar_almacen`;
    return this.http.post<StockAddResponse>(baseUrl, body).toPromise();
  }

  editStock(body: StockEditRequest): Promise<StockEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/editar_almacen`;
    return this.http.post<StockEditResponse>(baseUrl, body).toPromise();
  }

  removeStock(body: StockRemoveRequest): Promise<StockEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/borrar_almacen`;
    return this.http.post<StockEditResponse>(baseUrl, body).toPromise();
  }

}
