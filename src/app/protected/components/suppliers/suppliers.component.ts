import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Proveedor, SupplierListResponse } from '../../interfaces/supplier-list-response.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { SupplierRemoveRequest } from '../../interfaces/supplier-remove-request.interface';
import { SupplierAddRequest } from '../../interfaces/supplier-add-request.interface';
import { SupplierEditRequest } from '../../interfaces/supplier-edit-request.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';
import { Alerts } from '../../../shared/utils';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: [ './suppliers.component.scss' ]
})
export class SuppliersComponent implements OnInit {

  @ViewChild('closeButton') closeButton;

  supplierForm: UntypedFormGroup;
  supplier: Proveedor;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: SupplierRemoveRequest = {} as SupplierRemoveRequest;
  supplierAddRequest: SupplierAddRequest = {} as SupplierAddRequest;
  supplierEditRequest: SupplierEditRequest = {} as SupplierEditRequest;

  loading: false;
  suppliers: any;
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
      await this.retrieveSuppliers();
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
    this.supplierForm = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      estatus: [ false, Validators.required ]
    });
  }

  resetSupplier() {
    const oSupplier = {
      nombre: sessionStorage.getItem('nombre'),
      estatus: sessionStorage.getItem('estatus')
    };
    return oSupplier;
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

  get formSupplierReference() {
    return this.supplierForm.controls;
  }

  async onSave() {
    console.log(this.action);
    await this.spinner.show('sp');
    if (this.supplierForm.invalid) {
      return Object.values(this.supplierForm.controls).forEach((control) => {
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
          this.supplierAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                nombre: this.supplierForm.value.nombre,
                estatus: this.supplierForm.value.estatus ? 1 : 0
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveSupplier(this.supplierAddRequest);
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.supplierEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id_prov: +this.supplier.id_prov,
                nombre: this.supplierForm.value.nombre,
                estatus: this.supplierForm.value.estatus ? 1 : 0
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editSupplier(this.supplierEditRequest);
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveSuppliers();
      this.supplierForm.reset(this.resetSupplier());
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/suppliers');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  loadSupplierForm(supplier: Proveedor) {
    this.supplierForm.reset({
      nombre: supplier.nombre,
      estatus: +supplier.estatus === 1
    });
  }

  editSupplier(supplier: Proveedor) {
    this.supplier = supplier;
    this.setAction('edit');
    this.loadSupplierForm(supplier);
  }

  selectSupplier(supplier: Proveedor) {
    this.supplier = supplier;
  }

  async removeSupplier() {
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
            id_prov: +this.supplier.id_prov
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeSupplier(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveSuppliers();
      this.supplierForm.reset(this.resetSupplier());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
