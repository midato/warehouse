import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { StockAddRequest } from '../interfaces/stock-add-request.interface';
import { StockAddResponse } from '../interfaces/stock-add-response.interface';
import { StockListResponse } from '../interfaces/stock-list-response.interface';
import { StockEditRequest } from '../interfaces/stock-edit-request.interface';
import { StockEditResponse } from '../interfaces/stock-edit-response.interface';
import { StockRemoveRequest } from '../interfaces/stock-remove-request.interface';
import { RankingAddRequest } from '../interfaces/ranking-add-request.interface';
import { RankingAddResponse } from '../interfaces/rancking-add-response.interface';
import { RankingListResponse } from '../interfaces/ranking-list-response.interface';
import { RankingEditRequest } from '../interfaces/ranking-edit-request.interface';
import { RankingEditResponse } from '../interfaces/ranking-edit-response.interface';
import { RankingRemoveRequest } from '../interfaces/ranking-remove-request.interface';
import { RankingRemoveResponse } from '../interfaces/ranking-remove-response.interface';

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

  removeStock(body: StockRemoveRequest): Promise<StockRemoveRequest> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_almacenes/borrar_almacen`;
    return this.http.post<StockRemoveRequest>(baseUrl, body).toPromise();
  }

  retrieveRanking(body: any): Promise<RankingListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_clasificaciones/get_clasificaciones/`;
    return this.http.post<RankingListResponse>(baseUrl, body).toPromise();
  }

  saveRanking(body: RankingAddRequest): Promise<RankingAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_clasificaciones/agregar_clasificacion`;
    return this.http.post<RankingAddResponse>(baseUrl, body).toPromise();
  }

  editRanking(body: RankingEditRequest): Promise<RankingEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_clasificaciones/editar_clasificacion`;
    return this.http.post<RankingEditResponse>(baseUrl, body).toPromise();
  }

  removeRanking(body: RankingRemoveRequest): Promise<RankingRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_clasificaciones/borrar_clasificacion`;
    return this.http.post<RankingRemoveResponse>(baseUrl, body).toPromise();
  }

}
