import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppState } from '../core/store/app.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: AuthState) =>
        next.handle(req.clone({ params: req.params.append('auth', authState.token) }))
      );
  }

}
