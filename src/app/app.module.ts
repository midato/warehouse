import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationInterceptorService } from './anonymous/interceptors/authentication-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { ProtectedModule } from './protected/protected.module';
import { ProtectedRoutingModule } from './protected/protected-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './anonymous/components/login/login.component';
import { RegisterComponent } from './anonymous/components/register/register.component';
import { ForgotPasswordComponent } from './anonymous/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './anonymous/components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProtectedModule,
    ProtectedRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
