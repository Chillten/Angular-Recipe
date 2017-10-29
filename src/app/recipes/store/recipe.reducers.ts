import { Recipe } from '../../shared/model/recipe.model';
import { Ingredient } from '../../shared/model/ingredient.model';
import { ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE } from './recipe.actions';
import { AppState } from '../../core/store/app.reducers';

export interface RecipeAppState extends AppState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipesList: Recipe[];
}

const initialState: RecipeState = {
  recipesList: [
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
  ]
};


export function recipeReducer(state = initialState, action: RecipeActions) {
  switch (action.type) {
    case (SET_RECIPES): return {
      ...state,
      recipesList: [...action.payload]
    };
    case (ADD_RECIPE): return {
      ...state,
      recipesList: [...state.recipesList, action.payload]
    };
    case (UPDATE_RECIPE): {
      const recipes = [...state.recipesList];
      recipes[action.payload.index] = { ...state.recipesList[action.payload.index], ...action.payload.updateRecipe };
      return {
        ...state,
        recipesList: recipes
      };
    }
    case (DELETE_RECIPE): return {
      ...state,
      recipesList: [...state.recipesList].splice(action.payload.index, 1)
    };

    default:
      return state;
  }
}
