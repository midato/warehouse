import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../shared/shared.module";
import { SharedRoutingModule } from "../shared/shared-routing.module";

import { LayoutProtectedComponent } from './components/layout-protected.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutProtectedComponent,
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
