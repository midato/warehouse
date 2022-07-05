import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';

import { Unidad, UnitListResponse } from '../../interfaces/unit-list-response.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { TokenRemoveRequest } from '../../../anonymous/interfaces/token-remove-request.interface';
import { UnitAddRequest } from '../../interfaces/unit-add-request.interface';
import { UnitEditRequest } from '../../interfaces/unit-edit-request.interface';
import { Alerts } from '../../../shared/utils';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: [ './units.component.scss' ]
})
export class UnitsComponent implements OnInit {

  @ViewChild('closeButton') closeButton;

  unitForm: FormGroup;
  unit: Unidad;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: TokenRemoveRequest = {} as TokenRemoveRequest;
  unitAddRequest: UnitAddRequest = {} as UnitAddRequest;
  unitEditRequest: UnitEditRequest = {} as UnitEditRequest;

  loading: false;
  units: any;
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

    setTimeout(async () => {
      await this.retrieveUnits();
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
    this.unitForm = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      unidad_base: [ '', Validators.required ],
      cant_base: [ '', Validators.required ]
    });
  }

  resetUnit() {
    const oUnit = {
      nombre: sessionStorage.getItem('nombre'),
      unidad_base: sessionStorage.getItem('unidad_base'),
      cant_base: sessionStorage.getItem('cant_base')
    };
    console.log(oUnit);
    return oUnit;
  }

  async retrieveUnits() {
    const allUnitsRequest = {
      json: {
        user_id: +this.userId,
        id: 0
      }
    };
    const response: UnitListResponse = await this.protectedService.retrieveUnit(allUnitsRequest);
    this.units = response.unidades;
  }

  get formUnitReference() {
    return this.unitForm.controls;
  }

  async onSave() {
    await this.spinner.show('sp');
    if (this.unitForm.invalid) {
      return Object.values(this.unitForm.controls).forEach((control) => {
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
          this.unitAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                nombre: this.unitForm.value.nombre,
                unidad_base: this.unitForm.value.unidad_base,
                cant_base: this.unitForm.value.cant_base
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveUnit(this.unitAddRequest);
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.unitEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id: +this.unit.id,
                nombre: this.unitForm.value.nombre,
                unidad_base: this.unitForm.value.unidad_base,
                cant_base: this.unitForm.value.cant_base
              },
              edit_token: tokenResponse.edit_token
            }
          };
          console.log(this.unitEditRequest);
          response = await this.protectedService.editUnit(this.unitEditRequest);
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveUnits();
      this.unitForm.reset(this.resetUnit());
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/units');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  loadUnitForm(unit: Unidad) {
    this.unitForm.reset({
      nombre: unit.nombre,
      unidad_base: unit.unidad_base,
      cant_base: unit.cant_base
    });
  }

  editUnit(unit: Unidad) {
    this.unit = unit;
    this.setAction('edit');
    this.loadUnitForm(unit);
  }

  selectUnit(unit: Unidad) {
    this.unit = unit;
  }

  async removeUnit() {
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
            id: +this.unit.id
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeUnit(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveUnits();
      this.unitForm.reset(this.resetUnit());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
