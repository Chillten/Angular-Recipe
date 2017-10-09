import { Component } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService, private authService: AuthService) {
  }

  saveRecipes() {
    this.recipeService.storeRecipe();
  }

  loadRecipes() {
    this.recipeService.loadRecipes();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
