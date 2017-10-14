import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Recipe } from './model/recipe.model';

@Injectable()
export class DaoService {

  constructor(private recipeService: RecipeService, private httpClient: HttpClient, private authService: AuthService) { }

  storeRecipe() {
    fromPromise(this.authService.getToken())
      .map(token => 'https://bogovich-angular-recipe.firebaseio.com/recipes.json?auth='.concat(token))
      .flatMap(url => this.httpClient.put(url, this.recipeService.getRecipes()))
      .subscribe();
  }

  loadRecipes() {
    fromPromise(this.authService.getToken())
      .map(token => 'https://bogovich-angular-recipe.firebaseio.com/recipes.json?auth='.concat(token))
      .flatMap(url => this.httpClient.get<Recipe[]>(url))
      .map(Recipe.validateRecipes)
      .subscribe(r => this.recipeService.setRecipes(r));
  }
}
