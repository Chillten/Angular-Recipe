
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from './recipe.actions';
import { Recipe } from '../../shared/model/recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipeAppState } from './recipe.reducers';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class RecipeEffects {
  private firebaseUrl = 'https://bogovich-angular-recipe.firebaseio.com/';
  private recipesUrl = this.firebaseUrl.concat('recipes.json');

  @Effect()
  recipeFetch = this.actions$.ofType(FETCH_RECIPES)
    .switchMap(() => this.store.select('auth', 'token'))
    .switchMap(token => this.httpClient.get<Recipe[]>(this.recipesUrl, { params: new HttpParams().append('auth', token) }))
    .map(Recipes => new SetRecipes(Recipe.validateRecipes(Recipes)));

  @Effect({ dispatch: false })
  recipeDispatch = this.actions$.ofType(STORE_RECIPES)
    .switchMap(() => this.store.select('recipes', 'recipesList'))
    .withLatestFrom(this.store.select('auth', 'token'))
    .switchMap(([recipes, token]) => {
      return this.httpClient.put(this.recipesUrl, recipes, { params: new HttpParams().append('auth', token) });
    });

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<RecipeAppState>) {}
}
