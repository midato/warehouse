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
  keysLoaded = false;
  cryptoToken = '';
  token = '';
  accessId = '';

  env = environment.NG_APP_EWH_ENVIRONMENT;

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    // private readonly cryptoService: CryptoService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept...');
    // this.cryptoToken = this.authenticationService.getCryptoToken();
    /*  console.log(this.cryptoToken); */
    // this.accessId = this.authenticationService.getAccessId();
    /* console.log(this.accessId); */

    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers }));
    }

    /*if (this.env === 'dev') {
      request = request.clone({
        setHeaders: {
          'token': `${ this.cryptoToken }`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${ this.cryptoToken }`
        }
      });
    }*/

    /* console.log(request.headers); */
    /*request = request.clone({
        setHeaders: {
          /!* 'x-ismock': 'true', *!/
          'Authorization': `Bearer ${this.cryptoToken}`
        }
      }
    );*/
    /*console.log(this.cryptoToken);
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.cryptoToken}`)
    });
    console.log(request);*/

    /*if (this.cryptoToken) {
      request = request.clone({
          setHeaders: {
            // 'token': `${this.cryptoToken}`,
            'x-id-acceso': `${ this.accessId }`,
          }
        }
      );
    }*/

    this.token = this.authenticationService.getToken();
    console.log('token: ', this.token);
    if (this.token) {
      request = request.clone({
          setHeaders: {
            // 'x-token-acceso': `${token}`
            // 'x-token-acceso': 'L/hKy3a3nTbqMBJGQAc'
            'token': `${ this.token }`,
            // 'token': `${this.cryptoToken}`,
            // 'x-id-acceso': `${this.accessId}`,
            // 'x-token-acceso': `${ this.token }`
          }
        }
      );
    }

    console.log(request.headers.has('Content-Type'));
    if (!request.headers.has('Content-Type')) {
      console.log('dentro....');
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          // 'origin': '*',
          // 'Referrer-Policy':'unsafe-url'
        }
      });
      console.log(request);
    }

    /*request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    request = request.clone({
      headers: request.headers.set('origin', '*')
    });*/

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

  /*private encode(value: string): Uint8Array {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(value);
  }

  private decode(value: ArrayBuffer): string {
    const textDecoder = new TextDecoder();
    return textDecoder.decode(value);
  }*/
}
