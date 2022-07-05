import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { AuthenticationGuard } from '../anonymous/guards/authentication.guard';
import { UnitsComponent } from './components/units/units.component';

const lazyProtectedRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Inicio', optionBanner: true, breadcrumbs: false}
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Usuarios', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'rankings',
    component: RankingsComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Clasificaciones', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Clientes', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Proveedores', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'stocks',
    component: StocksComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Almacénes', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Productos', optionBanner: true, breadcrumbs: true}
  },
  {
    path: 'units',
    component: UnitsComponent,
    canActivate: [ AuthenticationGuard ],
    data: {optionMenuLabel: 'Unidades', optionBanner: true, breadcrumbs: true}
  },

  {path: '', redirectTo: 'protected', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forChild(lazyProtectedRoutes) ],
  exports: []
})
export class ProtectedLazyRoutesModule {
}
