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
import { RankingAddResponse } from '../interfaces/ranking-add-response.interface';
import { RankingListResponse } from '../interfaces/ranking-list-response.interface';
import { RankingEditRequest } from '../interfaces/ranking-edit-request.interface';
import { RankingEditResponse } from '../interfaces/ranking-edit-response.interface';
import { RankingRemoveRequest } from '../interfaces/ranking-remove-request.interface';
import { RankingRemoveResponse } from '../interfaces/ranking-remove-response.interface';
import { SupplierListResponse } from '../interfaces/supplier-list-response.interface';
import { SupplierAddRequest } from '../interfaces/supplier-add-request.interface';
import { SupplierAddResponse } from '../interfaces/supplier-add-response.interface';
import { SupplierEditRequest } from '../interfaces/supplier-edit-request.interface';
import { SupplierEditResponse } from '../interfaces/supplier-edit-response.interface';
import { SupplierRemoveRequest } from '../interfaces/supplier-remove-request.interface';
import { SupplierRemoveResponse } from '../interfaces/supplier-remove-response.interface';

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

  // STOCKS
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

  // RANKINGS
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

  // SUPPLIERS
  retrieveSupplier(body: any): Promise<SupplierListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_proveedores/get_proveedores/`;
    return this.http.post<SupplierListResponse>(baseUrl, body).toPromise();
  }

  saveSupplier(body: SupplierAddRequest): Promise<SupplierAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_proveedores/agregar_proveedor`;
    return this.http.post<SupplierAddResponse>(baseUrl, body).toPromise();
  }

  editSupplier(body: SupplierEditRequest): Promise<SupplierEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_proveedores/editar_proveedor`;
    return this.http.post<SupplierEditResponse>(baseUrl, body).toPromise();
  }

  removeSupplier(body: SupplierRemoveRequest): Promise<SupplierRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_proveedores/borrar_proveedor`;
    return this.http.post<SupplierRemoveResponse>(baseUrl, body).toPromise();
  }

  // USERS
  /*retrieveUser(body: any): Promise<UserListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_usuarios/get_usuarios/`;
    return this.http.post<UserListResponse>(baseUrl, body).toPromise();
  }

  saveUser(body: UserAddRequest): Promise<UserAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_usuarios/agregar_usuario`;
    return this.http.post<UserAddResponse>(baseUrl, body).toPromise();
  }

  editUser(body: UserEditRequest): Promise<UserEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_usuarios/editar_usuario`;
    return this.http.post<UserEditResponse>(baseUrl, body).toPromise();
  }

  removeUser(body: UserRemoveRequest): Promise<UserRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_PREFIX}/index.php/modules/cont_usuarios/borrar_usuario`;
    return this.http.post<UserRemoveResponse>(baseUrl, body).toPromise();
  }*/


}
