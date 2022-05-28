import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationGuard } from '../anonymous/guards/authentication.guard';
import { RankingsComponent } from './components/rankings/rankings.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProductsComponent } from './components/products/products.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { UsersComponent } from './components/users/users.component';

const lazyProtectedRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Inicio', optionBanner: true, breadcrumbs: false}
  },
  {
    path: 'rankings',
    component: RankingsComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Clasificaciones', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'providers',
    component: ProvidersComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Proveedores', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'products',
    component: ProductsComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Productos', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'stocks',
    component: StocksComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Almacénes', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'users',
    component: UsersComponent,
    // canActivate: [AuthenticationGuard],
    data: {optionMenuLabel: 'Usuarios', optionBanner: true, breadcrumbs: true}
  },

  {path: '', redirectTo: 'protected', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forChild(lazyProtectedRoutes) ],
  exports: []
})
export class ProtectedLazyRoutesModule {
}
