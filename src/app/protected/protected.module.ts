import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from '../shared/shared.module';
import { SharedRoutingModule } from '../shared/shared-routing.module';

import { LayoutProtectedComponent } from './components/layout-protected.component';
import { HomeComponent } from './components/home/home.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { UsersComponent } from './components/users/users.component';
import { CustomersComponent } from './components/customers/customers.component';
import { UnitsComponent } from './components/units/units.component';
import { ShoppingComponent } from './components/shopping/shopping.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutProtectedComponent,
    RankingsComponent,
    SuppliersComponent,
    ProductsComponent,
    StocksComponent,
    UsersComponent,
    CustomersComponent,
    UnitsComponent,
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedRoutingModule,
    NgxSpinnerModule
  ]
})
export class ProtectedModule {
}
