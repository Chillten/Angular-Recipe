import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DaoService } from '../../shared/dao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private daoService: DaoService, private authService: AuthService) {
  }

  saveRecipes() {
    this.daoService.storeRecipe();
  }

  loadRecipes() {
    this.daoService.loadRecipes();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
