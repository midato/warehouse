import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from '../anonymous/guards/authentication.guard';
import { LayoutProtectedComponent } from './components/layout-protected.component';

const protectedRoutes: Routes = [
  {
    path: 'protected', component: LayoutProtectedComponent,
    canActivate: [ AuthenticationGuard ],
    loadChildren: () => import('./protected-lazy-routes.module').then(m => m.ProtectedLazyRoutesModule)
  }
];

@NgModule({
  imports: [ RouterModule.forChild(protectedRoutes) ],
  exports: [ RouterModule ]
})
export class ProtectedRoutingModule {
}
