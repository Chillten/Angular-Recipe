import { Ingredient } from './ingredient.model';

export interface StoreModel {
  shoppingList: { ingredients: Ingredient[] };
}
