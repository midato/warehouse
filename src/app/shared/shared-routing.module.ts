import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../anonymous/guards/authentication.guard';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const sharedRoutes: Routes = [
  {path: 'header', component: HeaderComponent, canActivate: [AuthenticationGuard]},
  {path: 'footer', component: FooterComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(sharedRoutes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {
}
