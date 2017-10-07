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

  getToken() {
    return firebase.auth().currentUser.getIdToken();
  }
}
