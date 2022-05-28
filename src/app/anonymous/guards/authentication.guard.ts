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
    // console.log('AuthenticationGuard: canActivate: ...');
    // const token = localStorage.getItem('token');
    const token = this.authenticationService.getToken();
    /* console.log('AuthenticationGuard: canActivate: token: ', token); */

    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
    const url: string = state.url;
    return this.checkSession(url);
  }

  checkSession(url: string): any {
    /* console.log('checkSession: url: ', url); */
    this.authenticationService.redirectUrl = url;
    if (this.authenticationService.getToken()) {
      /* console.log('Guard: User is in VALID SESSION'); */
      if (!this.authenticationService.isTokenExpired()) {
        return true;
      }
    }
    /* console.log('Guard: User is in INVALID SESSION'); */
    this.router.navigate([ '/login' ]).then(() => false);
  }

}
