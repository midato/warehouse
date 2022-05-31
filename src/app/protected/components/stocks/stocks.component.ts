import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';

import { Alerts } from "../../../shared/utils";
import { LoginRequest } from '../../../anonymous/interfaces/login-request.interface';
import { StockRequest } from '../../interfaces/stock-request.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';
import { StockResponse } from '../../interfaces/stock-response.interface';
import { StockListResponse } from '../../interfaces/stock-list-response.interface';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  stockForm: FormGroup;
  tokenRequest: TokenRequest = {} as TokenRequest;
  stockRequest: StockRequest = {} as StockRequest;

  loading: false;
  stocks: any;
  userId: string;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private protectedService: ProtectedService
  ) {
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('pk');

    this.stockForm = this.fb.group({
      nombre: ["", [Validators.required]],
      descripcion: ["", Validators.required],
      estatus: [false, Validators.required],
    });

    setTimeout(async () => {
      await this.retrieveStocks();
    }, 100);

  }

  resetStock() {
    const oStock = {
      nombre: sessionStorage.getItem('nombre'),
      descripcion: sessionStorage.getItem('descripcion'),
      estatus: false
    };
    return oStock;
  }

  async retrieveStocks() {
    const allStocksRequest = {
      json: {
        user_id: +this.userId,
        id_almacen: 0
      }
    };
    console.log(allStocksRequest);

    const response: StockListResponse = await this.protectedService.retrieveStock(allStocksRequest);
    this.stocks = response.almacenes;
    console.log(this.stocks);
  }

  get formStockReference() {
    return this.stockForm.controls;
  }

  async onSave() {
    await this.spinner.show('sp');
    console.log(this.stockForm.value);
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
      const tokenAddResponse = await this.authenticationService.tokenAdd(this.tokenRequest);
      console.log(tokenAddResponse);

      this.stockRequest = {
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
          add_token: tokenAddResponse.add_token
        }
      };
      console.log(this.stockRequest);

      const response = await this.protectedService.saveStock(this.stockRequest);
      console.log(response);
      await this.retrieveStocks();
      this.stockForm.reset(this.resetStock());

      await this.spinner.hide('sp');
      await this.router.navigateByUrl("protected/stocks");
    } catch (error) {
      console.log(error);
      await this.spinner.hide('sp');
      const message = error.message; // error.error.detalles[0];
      await Alerts.customFailedButton("Easy Warehouse", "error", message);
    }
  }

  remove(stock: any, i: number) {
  }

}
