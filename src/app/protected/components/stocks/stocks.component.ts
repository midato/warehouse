import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { Alerts } from '../../../shared/utils';
import { StockAddRequest } from '../../interfaces/stock-add-request.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';
import { Almacen, StockListResponse } from '../../interfaces/stock-list-response.interface';
import { StockEditRequest } from '../../interfaces/stock-edit-request.interface';
import { TokenRemoveRequest } from '../../../anonymous/interfaces/token-remove-request.interface';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: [ './stocks.component.scss' ]
})
export class StocksComponent implements OnInit {
  @ViewChild('closeButton') closeButton;
  // @ViewChild('stockModal') stockModal;

  stockForm: FormGroup;
  stock: Almacen;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: TokenRemoveRequest = {} as TokenRemoveRequest;
  stockAddRequest: StockAddRequest = {} as StockAddRequest;
  stockEditRequest: StockEditRequest = {} as StockEditRequest;

  loading: false;
  stocks: any;
  userId: string;
  action: string;
  modal: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private protectedService: ProtectedService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show('gral');

    this.userId = sessionStorage.getItem('pk');
    this.resetForm();
    /*this.stockForm = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      descripcion: [ '', Validators.required ],
      estatus: [ false, Validators.required ]
    });*/

    setTimeout(async () => {
      await this.retrieveStocks();
      await this.spinner.hide('gral');
    }, 100);
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  /*openModal() {
    this.stockModal.nativeElement.click();
  }*/

  setAction(action: string) {
    this.action = action;
  }

  resetForm() {
    this.action = 'new';
    this.stockForm = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      descripcion: [ '', Validators.required ],
      estatus: [ false, Validators.required ]
    });
  }

  resetStock() {
    const oStock = {
      nombre: sessionStorage.getItem('nombre'),
      descripcion: sessionStorage.getItem('descripcion'),
      estatus: sessionStorage.getItem('estatus')
    };
    console.log(oStock);
    return oStock;
  }

  async retrieveStocks() {
    const allStocksRequest = {
      json: {
        user_id: +this.userId,
        id_almacen: 0
      }
    };
    const response: StockListResponse = await this.protectedService.retrieveStock(allStocksRequest);
    this.stocks = response.almacenes;
  }

  get formStockReference() {
    return this.stockForm.controls;
  }

  async onSave() {
    await this.spinner.show('sp');
    if (this.stockForm.invalid) {
      return Object.values(this.stockForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
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
          this.stockAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                nombre: this.stockForm.value.nombre,
                descripcion: this.stockForm.value.descripcion,
                estatus: this.stockForm.value.estatus ? 1 : 0
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveStock(this.stockAddRequest);
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.stockEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id: +this.stock.id,
                nombre: this.stockForm.value.nombre,
                descripcion: this.stockForm.value.descripcion,
                estatus: this.stockForm.value.estatus ? 1 : 0
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editStock(this.stockEditRequest);
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveStocks();
      this.stockForm.reset(this.resetStock());
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/stocks');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  loadStockForm(stock: Almacen) {
    this.stockForm.reset({
      nombre: stock.nombre,
      descripcion: stock.descripcion,
      estatus: +stock.estatus === 1
    });
  }

  editStock(stock: Almacen) {
    this.stock = stock;
    this.setAction('edit');
    this.loadStockForm(stock);
  }

  selectStock(stock: Almacen) {
    this.stock = stock;
  }

  async removeStock() {
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
            id: +this.stock.id
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeStock(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveStocks();
      this.stockForm.reset(this.resetStock());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
