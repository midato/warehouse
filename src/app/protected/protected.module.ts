import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { SharedRoutingModule } from "../shared/shared-routing.module";

import { LayoutProtectedComponent } from './components/layout-protected.component';
import { HomeComponent } from './components/home/home.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProductsComponent } from './components/products/products.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutProtectedComponent,
    RankingsComponent,
    ProvidersComponent,
    ProductsComponent,
    StocksComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedRoutingModule,
  ]
})
export class ProtectedModule {
}
