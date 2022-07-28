import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductListResponse, Producto } from '../../interfaces/product-list-response.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { ProductRemoveRequest } from '../../interfaces/product-remove-request.interface';
import { ProductAddRequest } from '../../interfaces/product-add-request.interface';
import { ProductEditRequest } from '../../interfaces/product-edit-request.interface';
import { Proveedor, SupplierListResponse } from '../../interfaces/supplier-list-response.interface';
// import { Clasificacion, RankingListResponse } from '../../interfaces/ranking-list-response.interface';
import { Unidad, UnitListResponse } from '../../interfaces/unit-list-response.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';
// import { Alerts } from '../../../shared/utils';
import { Almacen, StockListResponse } from '../../interfaces/stock-list-response.interface';
import * as _ from 'lodash';
import { Compra, ShoppingListResponse } from '../../interfaces/shopping-list-response.interface';
import { ShoppingAddRequest } from '../../interfaces/shopping-add-request.interface';
import { Alerts } from '../../../shared/utils';
import { GlobalService } from '../../../shared/services/global.service';
import { ShoppingEditRequest } from '../../interfaces/shopping-edit-request.interface';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: [ './shopping.component.scss' ]
})
export class ShoppingComponent implements OnInit {

  @ViewChild('closeButton') closeButton;

  shoppingForm: FormGroup;
  TotalRow: number;

  product: Producto;
  shopping: Compra;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: ProductRemoveRequest = {} as ProductRemoveRequest;
  shoppingAddRequest: ShoppingAddRequest = {} as ShoppingAddRequest;
  shoppingEditRequest: ShoppingEditRequest = {} as ShoppingEditRequest;
  productAddRequest: ProductAddRequest = {} as ProductAddRequest;
  productEditRequest: ProductEditRequest = {} as ProductEditRequest;

  loading: false;
  products: any;
  shoppings: any;
  suppliers: Proveedor[];
  stocks: Almacen[];
  // rankings: Clasificacion[];
  units: Unidad[];
  userId: string;
  action: string;
  modal: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private protectedService: ProtectedService,
    private globalService: GlobalService
  ) {
    this.resetForm();
  }

  ngOnInit(): void {
    this.spinner.show('gral');
    this.userId = sessionStorage.getItem('pk');

    setTimeout(async () => {
      await this.retrieveSuppliers();
      await this.retrieveStocks();
      await this.retrieveProducts();
      await this.retrieveUnits();
      await this.retrieveShoppings();
      await this.spinner.hide('gral');
    }, 100);
  }

  sum() {
    let total = 0;
    console.log(this.productos.controls);
    console.log(this.productos.controls.length);
    for (let i = 0; i < this.productos.controls.length; i++) {
      const quantity = (this.productos.at(i) as FormGroup).controls.cantidad.value;
      const price = (this.productos.at(i) as FormGroup).controls.precio.value;
      const subtotal = quantity * price;
      total += subtotal;
    }
    this.formShoppingReference.total.patchValue(total);
  }

  getSubtotal(index: number) {
    const quantity = (this.productos.at(index) as FormGroup).controls.cantidad.value;
    const price = (this.productos.at(index) as FormGroup).controls.precio.value;
    const subtotal = quantity * price;
    (this.productos.at(index) as FormGroup).controls.cantidad.patchValue(+quantity);
    (this.productos.at(index) as FormGroup).controls.subtotal.patchValue(subtotal);
    (this.productos.at(index) as FormGroup).controls.subtotal.disable();
    this.sum();
  }

  getProductName(event: any, index: number) {
    const item = this.getProductSelected(event.target.value, this.products)[0];
    console.log(item);
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
    return this.shoppingForm && this.shoppingForm.get('productos') as FormArray;
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
    this.shoppingForm = new FormGroup({
      id_almacen: new FormControl(null, [ Validators.required ]),
      id_proveedor: new FormControl(null, [ Validators.required ]),
      fecha: new FormControl(null, [ Validators.required ]),
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
    console.log(oProduct);
    return oProduct;
  }

  async retrieveShopping() {
    const allProductsRequest = {
      json: {
        user_id: +this.userId,
        id_prod: 0
      }
    };
    const response: ProductListResponse = await this.protectedService.retrieveProduct(allProductsRequest);
    console.log(response);
    this.shoppings = response.productos;
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

  async retrieveShoppings() {
    const allShoppingsRequest = {
      json: {
        user_id: +this.userId,
        id: 0,
        limit: 0,
        offset: 0
      }
    };
    const response: ShoppingListResponse = await this.protectedService.retrieveShopping(allShoppingsRequest);
    console.log(response);
    this.shoppings = response.compras;
  }

  async retrieveSuppliers() {
    const allSuppliersRequest = {
      json: {
        user_id: +this.userId,
        id_prov: 0
      }
    };
    const response: SupplierListResponse = await this.protectedService.retrieveSupplier(allSuppliersRequest);
    console.log(response);
    this.suppliers = response.proveedores;
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

  get formShoppingReference() {
    return this.shoppingForm.controls;
  }

  async onSave() {
    console.log(this.shoppingForm.value);
    await this.spinner.show('sp');
    if (this.shoppingForm.invalid) {
      return Object.values(this.shoppingForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    const values = this.shoppingForm.value;
    console.log(values);
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
          this.shoppingAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                compra: {
                  id_proveedor: values.id_proveedor,
                  id_almacen: values.id_almacen,
                  id_user: this.userId,
                  total: values.total,
                  fecha: this.globalService.formatDateToStringYY_MM_DD_HH_mm_ss(new Date())
                },
                productos: values.productos
              },
              add_token: tokenResponse.add_token
            }
          };

          console.log(this.shoppingAddRequest);
          response = await this.protectedService.saveShopping(this.shoppingAddRequest);
          this.shoppingForm.reset(this.resetProduct());
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.shoppingEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id_compra: '0',
                compra: {
                  id_proveedor: '1',
                  id_almacen: '2',
                  id_user: '1',
                  total: '44.444',
                  fecha: '2022-07-26 00:08:44'
                },
                productos: []
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editShopping(this.shoppingEditRequest);
          this.closeModal();
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveSuppliers();
      await this.retrieveStocks();
      await this.retrieveProducts();
      await this.retrieveUnits();
      await this.retrieveShoppings();
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/shopping');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  /*loadProductForm(shopping: Compra) {
    this.shoppingForm.reset({
      producto: product.producto,
      id_prov: product.id_prov,
      id_clasif: product.id_clasif,
      max: product.max,
      min: product.min,
      existencias: product.existencias,
      presentacion: product.presentacion,
      id_unidad: product.id_unidad,
      estatus: +product.estatus === 1
    });
  }*/

  editShopping(shopping: Compra) {
    this.shopping = shopping;
    this.setAction('edit');
    // this.loadProductForm(shopping);
  }

  selectShopping(shopping: Compra) {
    this.shopping = shopping;
  }

  async removeProduct() {
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
            id_prod: +this.product.id_prod
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeProduct(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveShoppings();
      // this.shoppingForm.reset(this.resetProduct());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
