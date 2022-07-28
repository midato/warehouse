import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Clasificacion, RankingListResponse } from '../../interfaces/ranking-list-response.interface';
import { TokenRequest } from '../../../anonymous/interfaces/token-request.interface';
import { RankingRemoveRequest } from '../../../anonymous/interfaces/ranking-remove-request.interface';
import { RankingAddRequest } from '../../interfaces/ranking-add-request.interface';
import { RankingEditRequest } from '../../interfaces/ranking-edit-request.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../anonymous/services/authentication.service';
import { ProtectedService } from '../../services/protected.service';
import { Alerts } from '../../../shared/utils';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: [ './rankings.component.scss' ]
})
export class RankingsComponent implements OnInit {

  @ViewChild('closeButton') closeButton;
  // @ViewChild('rankingModal') rankingModal;

  rankingForm: UntypedFormGroup;
  ranking: Clasificacion;
  tokenRequest: TokenRequest = {} as TokenRequest;
  tokenRemoveRequest: RankingRemoveRequest = {} as RankingRemoveRequest;
  rankingAddRequest: RankingAddRequest = {} as RankingAddRequest;
  rankingEditRequest: RankingEditRequest = {} as RankingEditRequest;

  loading: false;
  rankings: any;
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
    /*this.rankingForm = this.fb.group({
      clasificacion: [ '', [ Validators.required ] ],
      status: [ false, Validators.required ]
    });*/

    setTimeout(async () => {
      await this.retrieveRankings();
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
    this.rankingForm = this.fb.group({
      clasificacion: [ '', [ Validators.required ] ],
      status: [ false, Validators.required ]
    });
  }

  resetRanking() {
    const oRanking = {
      clasificacion: sessionStorage.getItem('clasificacion'),
      status: sessionStorage.getItem('status')
    };
    return oRanking;
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

  get formRankingReference() {
    return this.rankingForm.controls;
  }

  async onSave() {
    console.log(this.action);
    await this.spinner.show('sp');
    if (this.rankingForm.invalid) {
      return Object.values(this.rankingForm.controls).forEach((control) => {
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
          this.rankingAddRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              add_data: {
                clasificacion: this.rankingForm.value.clasificacion,
                status: this.rankingForm.value.status ? 1 : 0
              },
              add_token: tokenResponse.add_token
            }
          };
          response = await this.protectedService.saveRanking(this.rankingAddRequest);
          break;

        case 'edit':
          tokenResponse = await this.authenticationService.tokenEdit(this.tokenRequest);
          this.rankingEditRequest = {
            json: {
              user_data: {
                id_user: +this.userId,
                user_active: 1
              },
              edit_data: {
                id_clasif: +this.ranking.id_clasif,
                clasificacion: this.rankingForm.value.clasificacion,
                status: this.rankingForm.value.status ? 1 : 0
              },
              edit_token: tokenResponse.edit_token
            }
          };
          response = await this.protectedService.editRanking(this.rankingEditRequest);
          break;

        default:
          console.log('default...');
          break;
      }
      await this.retrieveRankings();
      this.rankingForm.reset(this.resetRanking());
      await this.spinner.hide('sp');
      await this.router.navigateByUrl('protected/rankings');
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sp');
      const message = e.message; // error.error.detalles[0];
      await Alerts.customFailedButton('Easy Warehouse', 'error', message);
    }
  }

  loadRankingForm(ranking: Clasificacion) {
    this.rankingForm.reset({
      clasificacion: ranking.clasificacion,
      status: +ranking.status === 1
    });
  }

  editRanking(ranking: Clasificacion) {
    this.ranking = ranking;
    this.setAction('edit');
    this.loadRankingForm(ranking);
  }

  selectRanking(ranking: Clasificacion) {
    this.ranking = ranking;
  }

  async removeRanking() {
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
            id_clasif: +this.ranking.id_clasif
          },
          del_token: tokenResponse.del_token
        }
      };
      const response = await this.protectedService.removeRanking(this.tokenRemoveRequest);
      console.log(response);
      await this.retrieveRankings();
      this.rankingForm.reset(this.resetRanking());
      await this.spinner.hide('sr');
      this.closeModal();
    } catch (e) {
      console.log(e);
      await this.spinner.hide('sr');
    }
  }

}
