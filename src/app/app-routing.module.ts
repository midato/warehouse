import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './anonymous/components/login/login.component';
import { ForgotPasswordComponent } from './anonymous/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './anonymous/components/reset-password/reset-password.component';
import { RegisterComponent } from './anonymous/components/register/register.component';
import { ProtectedRoutingModule } from './protected/protected-routing.module';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true, scrollOffset: [ 0, 0 ], scrollPositionRestoration: 'top'}),
    ProtectedRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
