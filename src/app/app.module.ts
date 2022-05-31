import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { ProtectedModule } from './protected/protected.module';
import { ProtectedRoutingModule } from './protected/protected-routing.module';
import { SharedModule } from './shared/shared.module';
import { SharedRoutingModule } from './shared/shared-routing.module';

import { AuthenticationInterceptorService } from './anonymous/interceptors/authentication-interceptor.service';

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
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
