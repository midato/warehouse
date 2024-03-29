import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Alerts } from '../../../shared/utils';

import { NgxSpinnerService } from 'ngx-spinner';

import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';

import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { ProductListResponse, Producto } from '../../interfaces/product-list-response.interface';
import { ProductAddRequest } from '../../interfaces/product-add-request.interface';
import { ProductEditRequest } from '../../interfaces/product-edit-request.interface';
import { ProductRemoveRequest } from '../../interfaces/product-remove-request.interface';
import { Proveedor, SupplierListResponse } from '../../interfaces/supplier-list-response.interface';
import { Clasificacion, RankingListResponse } from '../../interfaces/ranking-list-response.interface';
import { Unidad, UnitListResponse } from '../../interfaces/unit-list-response.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {
  @ViewChild('closeButton') closeButton;

  dtOptions: DataTables.Settings = {};
  dtPaginate: DataTables.LanguagePaginateSettings = {
    first: '|<',
    next: '>',
    previous: '<',
    last: '>|'
  };
  dtTrigger: Subject<any> = new Subject<any>();

  productForm: UntypedFormGroup;
  product: Producto;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: ProductRemoveRequest = {} as ProductRemoveRequest;
  productAddRequest: ProductAddRequest = {} as ProductAddRequest;
  productEditRequest: ProductEditRequest = {} as ProductEditRequest;

  loading: false;
  products: any;
  suppliers: Proveedor[];
  rankings: Clasificacion[];
  units: Unidad[];
  userId: string;
  action: string;
  modal: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private protectedService: ProtectedService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show('gral');
    this.userId = sessionStorage.getItem('pk');
    this.resetForm();

    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-MX.json',
        paginate: this.dtPaginate
      },
      lengthMenu: [
        10, 15, 30
      ],
      scrollY: '700',
      autoWidth: false,
      columnDefs: [
        {'width': '5%', 'targets': 0},
        {'width': '10%', 'targets': 2}
      ],
      retrieve: true
    };

    setTimeout(async () => {
      await this.retrieveProducts();
      await this.retrieveSuppliers();
      await this.retrieveRankings();
      await this.retrieveUnits();
      await this.spinner.hide('gral');
    }, 100);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  setAction(action: string) {
    this.action = action;
  }

  resetForm() {
    this.action = 'new';
    this.productForm = this.fb.group({
      producto: [ '', [ Validators.required ] ],
      id_prov: [ null, [ Validators.required ] ],
      id_clasif: [ null, [ Validators.required ] ],
      max: [ null, [ Validators.required ] ],
      min: [ null, [ Validators.required ] ],
      existencias: [ null, [ Validators.required ] ],
      presentacion: [ '', [ Validators.required ] ],
      id_unidad: [ null, [ Validators.required ] ],
      estatus: [ false, Validators.required ]
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
    this.dtTrigger.next(null);

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

  async retrieveRankings() {
    const allRankingsRequest = {
      json: {
        user_id: +this.userId,
        id_clasificacion: 0
      }
    };
    const response: RankingListResponse = await this.protectedService.retrieveRanking(allRankingsRequest);
    console.log(response);
    this.rankings = response.clasificaciones;
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
    console.log(this.units);
  }

  get formProductReference() {
    return this.productForm.controls;
  }

  async onSave() {
    console.log(this.productForm.value);
    await this.spinner.show('sp');
    if (this.productForm.invalid) {
      return Object.values(this.productForm.controls).forEach((control) => {
        if (control instanceof UntypedFormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

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
          this.productAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                producto: this.productForm.value.producto,
                id_prov: +this.productForm.value.id_prov,
                id_clasif: +this.productForm.value.id_clasif,
                max: this.productForm.value.max,
                min: this.productForm.value.min,
                existencias: +this.productForm.value.existencias,
                presentacion: this.productForm.value.presentacion,
                id_unidad: +this.productForm.value.id_unidad,
                estatus: this.productForm.value.estatus ? 1 : 0
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveProduct(this.productAddRequest);
          this.productForm.reset(this.resetProduct());
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.productEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id_prod: +this.product.id_prod,
                producto: this.productForm.value.producto,
                id_prov: +this.productForm.value.id_prov,
                id_clasif: +this.productForm.value.id_clasif,
                max: this.productForm.value.max,
                min: this.productForm.value.min,
                existencias: this.productForm.value.existencias,
                presentacion: this.productForm.value.presentacion,
                id_unidad: +this.productForm.value.id_unidad,
                estatus: this.productForm.value.estatus ? 1 : 0
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editProduct(this.productEditRequest);
          this.closeModal();
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveProducts();
      await this.retrieveSuppliers();
      await this.retrieveRankings();
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/products');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  loadProductForm(product: Producto) {
    this.productForm.reset({
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
  }

  editProduct(product: Producto) {
    this.product = product;
    this.setAction('edit');
    this.loadProductForm(product);
  }

  selectProduct(product: Producto) {
    this.product = product;
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
      await this.retrieveProducts();
      this.productForm.reset(this.resetProduct());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
