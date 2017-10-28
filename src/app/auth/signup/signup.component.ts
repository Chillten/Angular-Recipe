import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignup(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    console.log(email + '' + password);
    this.store.dispatch(new AuthActions.TrySignup({
      username: email,
      password: password
    }));
  }
}
