import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AuthenticationGuard } from '../anonymous/guards/authentication.guard';

const lazyProtectedRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Inicio', optionBanner: true, breadcrumbs: false}
  },

  {path: '', redirectTo: 'protected', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(lazyProtectedRoutes)],
  exports: []
})
export class ProtectedLazyRoutesModule {
}
