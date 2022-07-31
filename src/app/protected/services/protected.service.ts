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
import { CustomerListResponse } from '../interfaces/customer-list-response.interface';
import { CustomerAddRequest } from '../interfaces/customer-add-request.interface';
import { CustomerAddResponse } from '../interfaces/customer-add-response.interface';
import { CustomerEditRequest } from '../interfaces/customer-edit-request.interface';
import { CustomerEditResponse } from '../interfaces/customer-edit-response.interface';
import { CustomerRemoveRequest } from '../interfaces/customer-remove-request.interface';
import { CustomerRemoveResponse } from '../interfaces/customer-remove-response.interface';
import { ProductListResponse } from '../interfaces/product-list-response.interface';
import { ProductAddRequest } from '../interfaces/product-add-request.interface';
import { ProductAddResponse } from '../interfaces/product-add-response.interface';
import { ProductEditRequest } from '../interfaces/product-edit-request.interface';
import { ProductEditResponse } from '../interfaces/product-edit-response.interface';
import { ProductRemoveRequest } from '../interfaces/product-remove-request.interface';
import { ProductRemoveResponse } from '../interfaces/product-remove-response.interface';
import { UnitListResponse } from '../interfaces/unit-list-response.interface';
import { UnitAddRequest } from '../interfaces/unit-add-request.interface';
import { UnitAddResponse } from '../interfaces/unit-add-response.interface';
import { UnitEditRequest } from '../interfaces/unit-edit-request.interface';
import { UnitEditResponse } from '../interfaces/unit-edit-response.interface';
import { UnitRemoveRequest } from '../interfaces/unit-remove-request.interface';
import { UnitRemoveResponse } from '../interfaces/unit-remove-response.interface';
import { ShoppingListResponse } from '../interfaces/shopping-list-response.interface';
import { ShoppingAddRequest } from '../interfaces/shopping-add-request.interface';
import { ShoppingAddResponse } from '../interfaces/shopping-add-response.interface';
import { ShoppingEditRequest } from '../interfaces/shopping-edit-request.interface';
import { ShoppingEditResponse } from '../interfaces/shopping-edit-response.interface';
import { ShoppingRemoveRequest } from '../interfaces/shopping-remove-request.interface';
import { ShoppingRemoveResponse } from '../interfaces/shopping-remove-response.interface';
import { SaleListResponse } from '../interfaces/sale-list-response.interface';
import { SaleAddResponse } from '../interfaces/sale-add-response.interface';
import { SaleAddRequest } from '../interfaces/sale-add-request.interface';
import { SaleEditRequest } from '../interfaces/sale-edit-request.interface';
import { SaleEditResponse } from '../interfaces/sale-edit-response.interface';
import { SaleRemoveRequest } from '../interfaces/sale-remove-request.interface';
import { SaleRemoveResponse } from '../interfaces/sale-remove-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  NG_APP_EWH_BASE_URL = environment.NG_APP_EWH_BASE_URL;
  NG_APP_EWH_VERSION = environment.NG_APP_EWH_VERSION;

  redirectUrl = '';

  constructor(
    private http: HttpClient
  ) {
  }

  // SALES
  retrieveSales(body: any): Promise<SaleListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_ventas/get_ventas/`;
    return this.http.post<SaleListResponse>(baseUrl, body).toPromise();
  }

  saveSale(body: SaleAddRequest): Promise<SaleAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_ventas/agregar_venta`;
    return this.http.post<SaleAddResponse>(baseUrl, body).toPromise();
  }

  editSale(body: SaleEditRequest): Promise<SaleEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_ventas/editar_venta`;
    return this.http.post<SaleEditResponse>(baseUrl, body).toPromise();
  }

  removeSale(body: SaleRemoveRequest): Promise<SaleRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_ventas/borrar_venta`;
    return this.http.post<SaleRemoveResponse>(baseUrl, body).toPromise();
  }

  // SHOPPINGS
  retrieveShoppings(body: any): Promise<ShoppingListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_compras/get_compras/`;
    return this.http.post<ShoppingListResponse>(baseUrl, body).toPromise();
  }

  saveShopping(body: ShoppingAddRequest): Promise<ShoppingAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_compras/agregar_compra`;
    return this.http.post<ShoppingAddResponse>(baseUrl, body).toPromise();
  }

  editShopping(body: ShoppingEditRequest): Promise<ShoppingEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_compras/editar_compra`;
    return this.http.post<ShoppingEditResponse>(baseUrl, body).toPromise();
  }

  removeShopping(body: ShoppingRemoveRequest): Promise<ShoppingRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_compras/borrar_compra`;
    return this.http.post<ShoppingRemoveResponse>(baseUrl, body).toPromise();
  }

  // STOCKS
  retrieveStock(body: any): Promise<StockListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_almacenes/get_almacenes/`;
    // const headers = new HttpHeaders()
    // .set('Access-Control-Allow-Headers', 'true');
    // .set('x-id-acceso', `${ this.getAccessId() }`)
    // .set('x-api-key', `${this.getApikey()}`);
    // console.log(headers);
    // return this.http.post<StockAddResponse>(baseUrl, body, {headers}).toPromise();
    return this.http.post<StockListResponse>(baseUrl, body).toPromise();
  }

  saveStock(body: StockAddRequest): Promise<StockAddResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_almacenes/agregar_almacen`;
    return this.http.post<StockAddResponse>(baseUrl, body).toPromise();
  }

  editStock(body: StockEditRequest): Promise<StockEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_almacenes/editar_almacen`;
    return this.http.post<StockEditResponse>(baseUrl, body).toPromise();
  }

  removeStock(body: StockRemoveRequest): Promise<StockRemoveRequest> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_almacenes/borrar_almacen`;
    return this.http.post<StockRemoveRequest>(baseUrl, body).toPromise();
  }

  // RANKINGS
  retrieveRanking(body: any): Promise<RankingListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clasificaciones/get_clasificaciones/`;
    return this.http.post<RankingListResponse>(baseUrl, body).toPromise();
  }

  saveRanking(body: RankingAddRequest): Promise<RankingAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clasificaciones/agregar_clasificacion`;
    return this.http.post<RankingAddResponse>(baseUrl, body).toPromise();
  }

  editRanking(body: RankingEditRequest): Promise<RankingEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clasificaciones/editar_clasificacion`;
    return this.http.post<RankingEditResponse>(baseUrl, body).toPromise();
  }

  removeRanking(body: RankingRemoveRequest): Promise<RankingRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clasificaciones/borrar_clasificacion`;
    return this.http.post<RankingRemoveResponse>(baseUrl, body).toPromise();
  }

  // SUPPLIERS
  retrieveSupplier(body: any): Promise<SupplierListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_proveedores/get_proveedores/`;
    return this.http.post<SupplierListResponse>(baseUrl, body).toPromise();
  }

  saveSupplier(body: SupplierAddRequest): Promise<SupplierAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_proveedores/agregar_proveedor`;
    return this.http.post<SupplierAddResponse>(baseUrl, body).toPromise();
  }

  editSupplier(body: SupplierEditRequest): Promise<SupplierEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_proveedores/editar_proveedor`;
    return this.http.post<SupplierEditResponse>(baseUrl, body).toPromise();
  }

  removeSupplier(body: SupplierRemoveRequest): Promise<SupplierRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_proveedores/borrar_proveedor`;
    return this.http.post<SupplierRemoveResponse>(baseUrl, body).toPromise();
  }

  // CUSTOMERS
  retrieveCustomer(body: any): Promise<CustomerListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clientes/get_clientes/`;
    return this.http.post<CustomerListResponse>(baseUrl, body).toPromise();
  }

  saveCustomer(body: CustomerAddRequest): Promise<CustomerAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clientes/agregar_cliente`;
    return this.http.post<CustomerAddResponse>(baseUrl, body).toPromise();
  }

  editCustomer(body: CustomerEditRequest): Promise<CustomerEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clientes/editar_cliente`;
    return this.http.post<CustomerEditResponse>(baseUrl, body).toPromise();
  }

  removeCustomer(body: CustomerRemoveRequest): Promise<CustomerRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_clientes/borrar_cliente`;
    return this.http.post<CustomerRemoveResponse>(baseUrl, body).toPromise();
  }

  // PRODUCTS
  retrieveProduct(body: any): Promise<ProductListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_productos/get_productos/`;
    return this.http.post<ProductListResponse>(baseUrl, body).toPromise();
  }

  saveProduct(body: ProductAddRequest): Promise<ProductAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_productos/agregar_producto`;
    return this.http.post<ProductAddResponse>(baseUrl, body).toPromise();
  }

  editProduct(body: ProductEditRequest): Promise<ProductEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_productos/editar_producto`;
    return this.http.post<ProductEditResponse>(baseUrl, body).toPromise();
  }

  removeProduct(body: ProductRemoveRequest): Promise<ProductRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_productos/borrar_producto`;
    return this.http.post<ProductRemoveResponse>(baseUrl, body).toPromise();
  }

  // UNITS
  retrieveUnit(body: any): Promise<UnitListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_unidades/get_unidades/`;
    return this.http.post<UnitListResponse>(baseUrl, body).toPromise();
  }

  saveUnit(body: UnitAddRequest): Promise<UnitAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_unidades/agregar_unidad`;
    return this.http.post<UnitAddResponse>(baseUrl, body).toPromise();
  }

  editUnit(body: UnitEditRequest): Promise<UnitEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_unidades/editar_unidad`;
    return this.http.post<UnitEditResponse>(baseUrl, body).toPromise();
  }

  removeUnit(body: UnitRemoveRequest): Promise<UnitRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_unidades/borrar_unidad`;
    return this.http.post<UnitRemoveResponse>(baseUrl, body).toPromise();
  }

  // USERS
  /*retrieveUser(body: any): Promise<UserListResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_usuarios/get_usuarios/`;
    return this.http.post<UserListResponse>(baseUrl, body).toPromise();
  }

  saveUser(body: UserAddRequest): Promise<UserAddResponse> {
    console.log(body);
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_usuarios/agregar_usuario`;
    return this.http.post<UserAddResponse>(baseUrl, body).toPromise();
  }

  editUser(body: UserEditRequest): Promise<UserEditResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_usuarios/editar_usuario`;
    return this.http.post<UserEditResponse>(baseUrl, body).toPromise();
  }

  removeUser(body: UserRemoveRequest): Promise<UserRemoveResponse> {
    const baseUrl = `${this.NG_APP_EWH_BASE_URL}${this.NG_APP_EWH_VERSION}/index.php/modules/cont_usuarios/borrar_usuario`;
    return this.http.post<UserRemoveResponse>(baseUrl, body).toPromise();
  }*/


}
