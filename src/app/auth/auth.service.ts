import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AppState } from '../core/store/app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private store: Store<AppState>) { }

  signupUser(email: string, password: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new AuthActions.Signup());
        this.signinUser(email, password);
      })
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new AuthActions.Signin());
        firebase.auth().currentUser.getIdToken().then(
          token => this.store.dispatch(new AuthActions.SetToken(token))
        );
        this.router.navigate(['/']);
      })
      .catch(console.log);
  }

  logout() {
    firebase.auth().signOut()
      .then(() => this.store.dispatch(new AuthActions.Logout()));
  }
}
