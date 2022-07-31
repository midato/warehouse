import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

import { ProductListResponse, Producto } from '../../interfaces/product-list-response.interface';
import { Venta, Producto as Prod, SaleListResponse } from '../../interfaces/sale-list-response.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { SaleRemoveRequest } from '../../interfaces/sale-remove-request.interface';
import { SaleAddRequest } from '../../interfaces/sale-add-request.interface';
import { SaleEditRequest } from '../../interfaces/sale-edit-request.interface';
import { Cliente, CustomerListResponse } from '../../interfaces/customer-list-response.interface';
import { Almacen, StockListResponse } from '../../interfaces/stock-list-response.interface';
import { Unidad, UnitListResponse } from '../../interfaces/unit-list-response.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';
import { GlobalService } from '../../../shared/services/global.service';
import { DateAdapter } from '@angular/material/core';
import { Alerts } from '../../../shared/utils';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: [ './sales.component.scss' ]
})
export class SalesComponent implements OnInit {

  @ViewChild('closeButton') closeButton;
  @ViewChild('closeButtonE') closeButtonE;

  saleForm: FormGroup;
  TotalRow: number;

  product: Producto;
  sale: Venta;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: SaleRemoveRequest = {} as SaleRemoveRequest;
  saleAddRequest: SaleAddRequest = {} as SaleAddRequest;
  saleEditRequest: SaleEditRequest = {} as SaleEditRequest;

  loading: false;
  products: any;
  sales: any;
  customers: Cliente[];
  stocks: Almacen[];
  units: Unidad[];
  userId: string;
  action: string;
  modal: any;
  date: FormControl = new FormControl(new Date());

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private protectedService: ProtectedService,
    private globalService: GlobalService,
    private dateAdapter: DateAdapter<Date>,
    private currencyPipe: CurrencyPipe
  ) {
    this.dateAdapter.setLocale('es-MX'); // dd/MM/yyyy
    this.resetForm();
  }

  ngOnInit(): void {
    this.spinner.show('gral');
    this.userId = sessionStorage.getItem('pk');

    setTimeout(async () => {
      await this.retrieveCustomers();
      await this.retrieveStocks();
      await this.retrieveProducts();
      await this.retrieveUnits();
      await this.retrieveSales();
      await this.spinner.hide('gral');
    }, 100);
  }

  sum() {
    let total = 0;
    for (let i = 0; i < this.productos.controls.length; i++) {
      const quantity = (this.productos.at(i) as FormGroup).controls.cantidad.value;
      const price = (this.productos.at(i) as FormGroup).controls.precio.value;
      const subtotal = quantity * price;
      total += subtotal;
    }
    this.formSaleReference.total.patchValue(this.currencyPipe.transform(total, '', ''));
  }

  getSubtotal(index: number) {
    const quantity = (this.productos.at(index) as FormGroup).controls.cantidad.value;
    const price = (this.productos.at(index) as FormGroup).controls.precio.value;
    const subtotal = quantity * price;
    (this.productos.at(index) as FormGroup).controls.cantidad.patchValue(+quantity);
    (this.productos.at(index) as FormGroup).controls.subtotal.patchValue(this.currencyPipe.transform(subtotal, '', ''));
    (this.productos.at(index) as FormGroup).controls.subtotal.disable();
    this.sum();
  }

  getProductName(event: any, index: number) {
    const item = this.getProductSelected(event.target.value, this.products)[0];
    (this.productos.at(index) as FormGroup).controls.producto.patchValue(item.producto);
    (this.productos.at(index) as FormGroup).controls.precio.patchValue(item.precio);
    (this.productos.at(index) as FormGroup).controls.presentacion.patchValue(item.presentacion);
    (this.productos.at(index) as FormGroup).controls.id_unidad.patchValue(item.id_unidad);
  }

  getProductSelected(id, object) {
    const selObj = _.filter(object, function (o) {
      return (_.includes(id, o.id_prod));
    });
    return selObj;
  }

  initProduct() {
    return new FormGroup({
      id_producto: new FormControl(0, [ Validators.required ]),
      producto: new FormControl('', [ Validators.required ]),
      cantidad: new FormControl(0, [ Validators.required ]),
      precio: new FormControl(0, [ Validators.required ]),
      subtotal: new FormControl(0, [ Validators.required ]),
      presentacion: new FormControl('', [ Validators.required ]),
      id_unidad: new FormControl(0, [ Validators.required ])
    });
  }

  get productos() {
    return this.saleForm && this.saleForm.get('productos') as FormArray;
  }

  addNewProduct() {
    this.productos.push(this.initProduct());
  }

  removeNewProduct(index: number) {
    if (this.productos != null)
      this.TotalRow = this.productos.value.length;

    if (this.TotalRow > 1) {
      this.productos.removeAt(index);
      this.sum();
    } else return false;
    return true;
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  setAction(action: string) {
    this.action = action;
  }

  async resetForm() {
    this.action = 'new';
    this.saleForm = new FormGroup({
      id: new FormControl(0, []),
      id_almacen: new FormControl(null, [ Validators.required ]),
      id_cliente: new FormControl(null, [ Validators.required ]),
      fecha: new FormControl(''),
      total: new FormControl(0, [ Validators.required ]),
      productos: new FormArray([ this.initProduct() ])
    });
  }

  resetProduct() {
    const oProduct = {
      producto: sessionStorage.getItem('producto'),
      id_prov: sessionStorage.getItem('id_prov'),
      id_clasif: sessionStorage.getItem('id_clasif'),
      min: sessionStorage.getItem('min'),
      max: sessionStorage.getItem('max'),
      existencias: sessionStorage.getItem('existencias'),
      presentacion: sessionStorage.getItem('presentacion'),
      id_unidad: sessionStorage.getItem('id_unidad'),
      estatus: sessionStorage.getItem('estatus')
    };
    return oProduct;
  }

  async retrieveSale() {
    const allProductsRequest = {
      json: {
        user_id: +this.userId,
        id_prod: 0
      }
    };
    const response: ProductListResponse = await this.protectedService.retrieveProduct(allProductsRequest);
    this.sales = response.productos;
  }

  async retrieveProducts() {
    const allProductsRequest = {
      json: {
        user_id: +this.userId,
        id_prod: 0
      }
    };
    const response: ProductListResponse = await this.protectedService.retrieveProduct(allProductsRequest);
    console.log(response);
    this.products = response.productos;
  }

  async retrieveSales() {
    const allSalesRequest = {
      json: {
        user_id: +this.userId,
        id: 0,
        limit: 0,
        offset: 0
      }
    };
    const response: SaleListResponse = await this.protectedService.retrieveSales(allSalesRequest);
    console.log(response);
    this.sales = response.ventas;
  }

  async retrieveCustomers() {
    const allCustomersRequest = {
      json: {
        user_id: +this.userId,
        id_clie: 0
      }
    };
    const response: CustomerListResponse = await this.protectedService.retrieveCustomer(allCustomersRequest);
    console.log(response);
    this.customers = response.clientes;
  }

  async retrieveStocks() {
    const allStocksRequest = {
      json: {
        user_id: +this.userId,
        id_almacen: 0
      }
    };
    const response: StockListResponse = await this.protectedService.retrieveStock(allStocksRequest);
    console.log(response);
    this.stocks = response.almacenes;
  }

  async retrieveUnits() {
    const allUnitsRequest = {
      json: {
        user_id: +this.userId,
        id: 0
      }
    };
    const response: UnitListResponse = await this.protectedService.retrieveUnit(allUnitsRequest);
    console.log(response);
    this.units = response.unidades;
  }

  get formSaleReference() {
    return this.saleForm.controls;
  }

  removeFakeFields(products: any) {
    for (let product of products) {
      delete product.id_compra;
      delete product.subtotal;
    }
  }

  async onSave() {
    await this.spinner.show('sp');
    if (this.saleForm.invalid) {
      await this.spinner.hide('sp');
      return Object.values(this.saleForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    const values = this.saleForm.value;
    try {
      this.tokenRequest = {
        json: {
          user_data: {
            id_user: +this.userId,
            user_active: 1
          }
        }
      };

      let tokenResponse: any;
      let response;
      switch (this.action) {
        case 'new':
          tokenResponse = await this.authenticationService.tokenAdd(this.tokenRequest);
          this.saleAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                venta: {
                  id_cliente: values.id_cliente,
                  id_almacen: values.id_almacen,
                  id_user: this.userId,
                  total: `${values.total}`,
                  fecha: this.globalService.formatDateToStringYY_MM_DD_HH_mm_ss(values.fecha)
                },
                productos: values.productos
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveSale(this.saleAddRequest);
          this.saleForm.reset(this.resetProduct());
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.removeFakeFields(values.productos);
          this.saleEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id_venta: values.id,
                venta: {
                  id_cliente: values.id_cliente,
                  id_almacen: values.id_almacen,
                  id_user: this.userId,
                  total: values.total,
                  fecha: this.globalService.formatDateToStringYY_MM_DD_HH_mm_ss(values.fecha)
                },
                productos: values.productos
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editSale(this.saleEditRequest);
          this.closeModal();
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveCustomers();
      await this.retrieveStocks();
      await this.retrieveProducts();
      await this.retrieveUnits();
      await this.retrieveSales();
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/sale');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message;
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  newProduct(product: Prod): FormGroup {
    return this.fb.group({
      id_producto: new FormControl(product.id_producto, [ Validators.required ]),
      producto: new FormControl(product.producto, [ Validators.required ]),
      id_venta: new FormControl(product.id_venta, [ Validators.required ]),
      cantidad: new FormControl(product.cantidad, [ Validators.required ]),
      precio: new FormControl(product.precio, [ Validators.required ]),
      presentacion: new FormControl(product.presentacion, [ Validators.required ]),
      id_unidad: new FormControl(product.id_unidad, [ Validators.required ]),
      subtotal: new FormControl((+product.cantidad * +product.precio), [ Validators.required ])
    });
  }

  async loadProductForm(sale: Venta) {
    console.log(sale);
    this.date = new FormControl(this.globalService.parseStringToDate(this.globalService.formatDateToStringYY_MM_DD_HH_mm_ss(sale.fecha)));
    this.saleForm.reset({
      // id: 0,
      id_cliente: sale.id_cliente,
      id_almacen: sale.id_almacen,
      id_user: sale.id_user,
      // fecha: sale.fecha,
      total: sale.total,
      productos: this.fb.array([])
    });
    this.saleForm.controls['fecha'].setValue(new Date(new Date(sale.fecha).getTime()));
    this.saleForm.controls['id'].setValue(sale.id);

    let p = this.saleForm.get('productos') as FormArray;
    p.clear();
    for (let product of sale.productos) {
      p.push(this.newProduct(product));
    }
  }

  async editSale(sale: Venta) {
    this.sale = sale;
    this.setAction('edit');
    await this.loadProductForm(sale);
  }

  selectSale(sale: Venta) {
    this.sale = sale;
  }

  async removeSale() {
    try {
      await this.spinner.show('sr');
      this.tokenRequest = {
        json: {
          user_data: {
            id_user: +this.userId,
            user_active: 1
          }
        }
      };
      const tokenResponse = await this.authenticationService.tokenRemove(this.tokenRequest);
      this.tokenRemoveRequest = {
        json: {
          user_data: {
            id_user: +this.userId,
            user_active: 1
          },
          del_data: {
            id: +this.sale.id
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeSale(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveSales();
      this.resetForm();
      // this.saleForm.reset(this.resetProduct());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }
}
