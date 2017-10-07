import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  signupUser(email: string, password: string) {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(console.log);
  }

  signinUser(email: string, password: string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(console.log)
      .catch(console.log);
  }

  logout() {
    firebase.auth().signOut().then();
  }

  getToken() {
    return firebase.auth().currentUser.getIdToken();
  }

  isAuthenticated() {
    return firebase.auth().currentUser != null;
  }
}
