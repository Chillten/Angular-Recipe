import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('Intercepted!', req);
    return fromPromise(this.authService.getToken())
      .flatMap(token => next
        .handle(req.clone({ params: req.params.append('auth', token) }))
      );
  }

}
