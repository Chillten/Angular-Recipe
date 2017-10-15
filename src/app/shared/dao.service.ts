import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Recipe } from './model/recipe.model';

@Injectable()
export class DaoService {

  private firebaseUrl = 'https://bogovich-angular-recipe.firebaseio.com/';
  private recipesUrl = this.firebaseUrl.concat('recipes.json');

  constructor(private recipeService: RecipeService, private httpClient: HttpClient, private authService: AuthService) { }

  storeRecipe() {
    fromPromise(this.authService.getToken())
      .flatMap(token =>
        this.httpClient.put(
          this.recipesUrl,
          this.recipeService.getRecipes(),
          { params: new HttpParams().set('auth', token) })
      )
      .subscribe();
  }

  loadRecipes() {
    fromPromise(this.authService.getToken())
      .flatMap(token =>
        this.httpClient.get<Recipe[]>(
          this.recipesUrl,
          { params: new HttpParams().set('auth', token) })
      )
      .map(Recipe.validateRecipes)
      .subscribe(r => this.recipeService.setRecipes(r));
  }
}
