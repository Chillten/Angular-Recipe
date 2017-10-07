import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../common/model/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class RecipeService implements OnInit {
  recipesChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private http: Http, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.recipesChanged = new Subject<Recipe[]>();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  updateRecipe(id: number, recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }


  storeRecipe() {
    fromPromise(this.authService.getToken())
      .map(token => 'https://bogovich-angular-recipe.firebaseio.com/recipes.json?auth='.concat(token))
      .flatMap(url => this.http.put(url, this.recipes))
      .subscribe();
  }

  loadRecipes() {
    fromPromise(this.authService.getToken())
      .map(token => 'https://bogovich-angular-recipe.firebaseio.com/recipes.json?auth='.concat(token))
      .flatMap(url => this.http.get(url))
      .map((response: Response) => {
        const recipesResponse: Recipe[] = response.json();
        recipesResponse.forEach(this.validateRecipe);
        return recipesResponse;
      })
      .subscribe(r => this.setRecipes(r));
  }

  private validateRecipe(recipe: Recipe) {
    if (!recipe.name) {
      recipe.name = '';
    }
    if (!recipe.description) {
      recipe.description = '';
    }
    if (!recipe.imagePath) {
      recipe.imagePath = '';
    }
    if (!recipe.ingredients) {
      recipe.ingredients = [];
    }
  }
}
