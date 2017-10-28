import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.reducers';
import { AuthState } from './store/auth.reducers';

@Injectable()
export class AuthGuardService implements  CanActivate {

  constructor(private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .take(1)
      .map((authState: AuthState) => {
        return authState.authenticated;
      });
  }
}
