import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { Alerts } from '../../../shared/utils';

import { ProtectedService } from '../../services/protected.service';

import { Cliente, CustomerListResponse } from '../../interfaces/customer-list-response.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { CustomerRemoveRequest } from '../../interfaces/customer-remove-request.interface';
import { CustomerAddRequest } from '../../interfaces/customer-add-request.interface';
import { CustomerEditRequest } from '../../interfaces/customer-edit-request.interface';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: [ './customers.component.scss' ]
})
export class CustomersComponent implements OnInit {

  @ViewChild('closeButton') closeButton;

  customerForm: UntypedFormGroup;
  customer: Cliente;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: CustomerRemoveRequest = {} as CustomerRemoveRequest;
  customerAddRequest: CustomerAddRequest = {} as CustomerAddRequest;
  customerEditRequest: CustomerEditRequest = {} as CustomerEditRequest;

  loading: false;
  customers: any;
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
    setTimeout(async () => {
      await this.retrieveCustomers();
      await this.spinner.hide('gral');
    }, 100);
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  setAction(action: string) {
    this.action = action;
  }

  resetForm() {
    this.action = 'new';
    this.customerForm = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      estatus: [ false, Validators.required ]
    });
  }

  resetCustomer() {
    const oCustomer = {
      nombre: sessionStorage.getItem('nombre'),
      estatus: sessionStorage.getItem('estatus')
    };
    return oCustomer;
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

  get formCustomerReference() {
    return this.customerForm.controls;
  }

  async onSave() {
    console.log(this.action);
    await this.spinner.show('sp');
    if (this.customerForm.invalid) {
      return Object.values(this.customerForm.controls).forEach((control) => {
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
          this.customerAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                nombre: this.customerForm.value.nombre,
                estatus: this.customerForm.value.estatus ? 1 : 0
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveCustomer(this.customerAddRequest);
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.customerEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id_clie: +this.customer.id_clie,
                nombre: this.customerForm.value.nombre,
                estatus: this.customerForm.value.estatus ? 1 : 0
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editCustomer(this.customerEditRequest);
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveCustomers();
      this.customerForm.reset(this.resetCustomer());
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/customers');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  loadCustomerForm(customer: Cliente) {
    this.customerForm.reset({
      nombre: customer.nombre,
      estatus: +customer.estatus === 1
    });
  }

  editCustomer(customer: Cliente) {
    this.customer = customer;
    this.setAction('edit');
    this.loadCustomerForm(customer);
  }

  selectCustomer(customer: Cliente) {
    this.customer = customer;
  }

  async removeCustomer() {
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
            id_clie: +this.customer.id_clie
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeCustomer(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveCustomers();
      this.customerForm.reset(this.resetCustomer());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
