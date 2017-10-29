import { Action } from '@ngrx/store';
import { Recipe } from '../../shared/model/recipe.model';

export const SET_RECIPES = 'SET_RECIPE';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const STORE_RECIPES = 'STORE_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: {recipe: Recipe}) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {index: number, updateRecipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: {index: number}) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipe implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipeActions = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | FetchRecipe | StoreRecipe;
