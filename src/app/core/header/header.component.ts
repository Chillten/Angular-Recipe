import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { FetchRecipe, StoreRecipe } from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<AuthState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  saveRecipes() {
    this.store.dispatch(new StoreRecipe());
  }

  loadRecipes() {
    this.store.dispatch(new FetchRecipe());
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
