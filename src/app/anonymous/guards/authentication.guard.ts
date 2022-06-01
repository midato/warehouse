import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const apiKey = this.authenticationService.getApikey();
    if (apiKey) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
    const url: string = state.url;
    return this.checkSession(url);
    // return true;
  }

  checkSession(url: string): any {
    this.authenticationService.redirectUrl = url;
    if (this.authenticationService.getApikey()) {
      if (!this.authenticationService.isTokenExpired()) {
        return true;
      }
    }
    this.router.navigate([ '/login' ]).then(() => false);
  }

}
