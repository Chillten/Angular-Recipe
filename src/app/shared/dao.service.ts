import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Recipe } from './model/recipe.model';

@Injectable()
export class DaoService {

  private firebaseUrl = 'https://bogovich-angular-recipe.firebaseio.com/';
  private recipesUrl = this.firebaseUrl.concat('recipes.json');

  constructor(private recipeService: RecipeService, private httpClient: HttpClient) { }

  storeRecipe() {
    this.httpClient.put(this.recipesUrl, this.recipeService.getRecipes())
      .subscribe();
  }

  loadRecipes() {
    this.httpClient.get<Recipe[]>(this.recipesUrl)
      .map(Recipe.validateRecipes)
      .subscribe(r => this.recipeService.setRecipes(r));
  }
}
