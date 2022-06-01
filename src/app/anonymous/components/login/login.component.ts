import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../services/authentication.service';

import { Alerts } from '../../../shared/utils';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { LoginRequest } from '../../interfaces/login-request.interface';

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
    this.loginRequest = {
      json: {
        usr_name: this.loginForm?.value.username,
        usr_pass: this.loginForm?.value.password
      }
    };

    this.authenticationService.login(this.loginRequest)
      .subscribe(async (response: LoginResponse) => {
        if (this.loginForm?.get('rememberMe')?.value) {
          this.authenticationService.saveUsername(this.loginForm?.value.username);
        } else {
          this.authenticationService.removeApikey();
          this.authenticationService.removeUserId();
          this.authenticationService.removeUsername();
          this.authenticationService.removeUserRole();
        }

        this.authenticationService.saveApikey(response.usuario[0].user_api_key);
        this.authenticationService.saveUserId(response.usuario[0].id_user);
        this.authenticationService.saveUsername(this.loginForm?.value.username);
        this.authenticationService.saveUserRole(response.usuario[0].usr_profile_name);
        await this.spinner.hide();
        this.goToHome().then(() => console.log());
      }, (e) => {
        console.log(e);
        this.spinner.hide();
        throw new Error(e.error.mensaje);
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
    await this.router.navigateByUrl('protected/home');
  }

}
