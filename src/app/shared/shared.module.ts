import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

// import {ServerErrorInterceptor} from './interceptors/server-error.interceptor';
// import {PldGlobalErrorHandler} from './services/pld-global-error-handler';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SidebarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  exports: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SidebarComponent,
    SpinnerComponent
  ],
  providers: [
    // {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    // {provide: ErrorHandler, useClass: PldGlobalErrorHandler},
    // {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true}
  ]
})
export class SharedModule {
}
