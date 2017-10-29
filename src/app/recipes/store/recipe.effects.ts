
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FETCH_RECIPES, SetRecipes } from './recipe.actions';
import { Recipe } from '../../shared/model/recipe.model';
import { Injectable } from '@angular/core';
import { AppState } from '../../core/store/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  private firebaseUrl = 'https://bogovich-angular-recipe.firebaseio.com/';
  private recipesUrl = this.firebaseUrl.concat('recipes.json');

  @Effect()
  recipeFetch = this.actions$.ofType(FETCH_RECIPES)
    .switchMap(() => this.store.select('auth', 'token'))
    .switchMap(token => this.httpClient.get<Recipe[]>(this.recipesUrl, { params: new HttpParams().append('auth', token) }))
    .map(Recipes => new SetRecipes(Recipe.validateRecipes(Recipes)));

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<AppState>) {}
}
