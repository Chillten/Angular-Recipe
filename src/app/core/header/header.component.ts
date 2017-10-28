import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DaoService } from '../../shared/dao.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<AuthState>;

  constructor(private daoService: DaoService, private authService: AuthService,
              private store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  saveRecipes() {
    this.daoService.storeRecipe();
  }

  loadRecipes() {
    this.daoService.loadRecipes();
  }

  // authState() {
  //   return this.authService.authState();
  // }

  logout() {
    this.authService.logout();
  }
}
