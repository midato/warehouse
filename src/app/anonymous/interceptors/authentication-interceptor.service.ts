import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, retry } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
// import {CryptoService} from '../../shared/services/crypto.service';
// import {KeysResponse} from '../interfaces/keys-response.interface';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  // accessResponse: KeysResponse = {} as KeysResponse;
  // keysLoaded = false;
  // cryptoToken = '';
  apiKey = '';
  // accessId = '';

  env = environment.NG_APP_EWH_ENVIRONMENT;

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.apiKey = this.authenticationService.getApikey();
    if (this.apiKey) {
      request = request.clone({
          setHeaders: {
            'x-api-key': `${this.apiKey}`
          }
        }
      );
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'origin': '*',
          // 'Referrer-Policy':'unsafe-url'
        }
      });
    }

    return next.handle(request)
      .pipe(
        retry(1),
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log(`AuthenticationInterceptorService: intercept...`);
          }
          return event;
          /*if (event instanceof HttpResponse && event.body.code !== 0) {
            return Observable.create((observer: any) => observer.error(event));
          }
          return Observable.create((observer: any) => observer.next(event));*/
        }),
        catchError((error: HttpErrorResponse) => {
          // console.log('ERROR:   ', error);
          if (error.status === 401) {
            this.router.navigate([ 'login' ]).then(_ => console.log(''));
          }
          return throwError(error);
        })
      );
  }

}
