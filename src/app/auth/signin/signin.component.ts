import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../core/store/app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignin(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    console.log(email + '' + password);
    this.store.dispatch(new AuthActions.TrySignin({
      username: email,
      password: password
    }));
  }
}
