import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { AuthenticationService } from '../../services/authentication.service';
import { Alerts } from '../../../shared/utils';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  focus: any;
  focus1: any;

  loginForm: FormGroup;

  loginRequest: LoginRequest = {} as LoginRequest;

  // @Input() agentsData: Historial[] = Array<Historial>();


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [ '', [ Validators.required ] ],
      password: [ '', Validators.required ],
      rememberMe: [ false, Validators.required ]
    });
    this.loginForm.reset(this.onSetAccess());
  }

  get formLoginReference() {
    return this.loginForm?.controls;
  }

  async onLogin() {
    await this.spinner.show();
    console.log(this.loginForm);
    console.log(this.loginForm?.value);
    if (this.loginForm?.invalid) {
      this.loginForm?.markAllAsTouched();
      const messageSuccess = '';
      Alerts.customFailedButton('Warehouse', 'success', messageSuccess).then(() => {
      });

      await this.spinner.hide();
      return false;
    }

    this.onVerificateSaveSession();
    await this.spinner.show();
    // const encryptedRequest = await this.cryptoService.encryptObject(this.loginForm.value);
    /* console.log(encryptedRequest); */
    // this.loginRequest.json.usr_name = this.loginForm.value.username;
    // this.loginRequest.json.usr_pass = this.loginForm.value.password;

    this.loginRequest = {
      json: {
        usr_name: this.loginForm?.value.username,
        usr_pass: this.loginForm?.value.password
      }
    };

    console.log(this.loginRequest);
    this.authenticationService.login(this.loginRequest)
      .subscribe(async (response: LoginResponse) => {
        console.log(response);
        if (this.loginForm?.get('rememberMe')?.value) {
          this.authenticationService.saveUsername(this.loginForm?.value.username);
        } else {
          this.authenticationService.removeUsername();
          this.authenticationService.removeUserRole();
        }

        // const decryptedResponse = await this.cryptoService.decryptObject(response);
        /* console.log(decryptedResponse); */
        // this.agentId = response.resultado.idAgente;
        this.authenticationService.saveToken(response.usuario[0].user_api_key);
        this.authenticationService.saveUsername(this.loginForm?.value.username);
        this.authenticationService.saveUserRole(response.usuario[0].usr_profile_name);
        await this.spinner.hide();
        this.goToHome().then(() => console.log());

        // this.agentSearchForm.pagina = 1;
        // this.agentSearchForm.idAgente = this.agentId;
        // console.log(this.agentSearchForm);
        // const encryptedRequest = await this.cryptoService.encryptProps(
        // this.agentSearchForm, ['pagina', 'rol', 'fechaInicio', 'fechaFin']
        // );
        /*const customerPayload = {
          idAgente: this.agentId
        };*/
        // const encryptedRequest = await this.cryptoService.encryptObject(customerPayload);
        /* console.log(encryptedRequest); */
        /*this.authenticationService.getUser(encryptedRequest).subscribe(async (response) => {
          this.userAgent = await this.cryptoService.decryptObject(response);
          /!* console.log(this.userAgent); *!/
          const userName = `${ this.userAgent.resultado.nombre } ${ this.userAgent.resultado.apellidoMaterno }`;
          const userRole = this.userAgent.resultado.rol;
          this.authenticationService.saveUserName(userName);
          this.authenticationService.saveUserRole(userRole);
          await this.spinner.hide();
          this.goToHome().then(() => console.log());
        }, (err) => {
          /!*  console.log(err); *!/
          this.spinner.hide();
          Swal.fire('Error', err.error.mensaje, 'error');
          return false;
        });*/
      }, (err) => {
        /* console.log(err);
        console.log(err.error.mensaje); */
        this.spinner.hide();
        throw new Error(err.error.mensaje);
        // Swal.fire('Error', err.error.mensaje, 'error');
        // return false;
      });
    return false;
  }

  onSetAccess() {
    const oUSer = {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
      rememberMe: false
    };
    this.authenticationService.removeUsername();
    this.authenticationService.removeUserRole();
    return oUSer;
  }

  onVerificateSaveSession() {
    if (this.loginForm?.value.esRecuerdame) {
      sessionStorage.setItem('username', this.loginForm?.value.username);
      sessionStorage.setItem('password', this.loginForm?.value.password);
    } else {
      sessionStorage.clear();
    }
  }

  async goToHome() {
    await this.router.navigateByUrl('home');
  }

}
