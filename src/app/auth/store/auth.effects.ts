import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        new AuthActions.Signup(),
        new AuthActions.SetToken(token)
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        new AuthActions.Signin(),
        new AuthActions.SetToken(token)
      ];
    });

  @Effect({ dispatch: false })
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .switchMap(() => fromPromise(firebase.auth().signOut()))
    .do(() => {
      console.log('Effect logout');
      this.router.navigate(['/']);
    });

  constructor(private actions$: Actions, private router: Router) {
  }
}
