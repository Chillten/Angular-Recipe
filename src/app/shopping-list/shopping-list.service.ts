import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { AddIngredients } from './store/shopping-list.actions';
import { StoreModel } from '../shared/model/store.model';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new Subject<void>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Orange', 10)
  ];

  constructor(private store: Store<StoreModel>) { }

  addToIngredientList(list: Ingredient[]) {
    this.store.dispatch(new AddIngredients(list));
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(editedItemIndex: number, editedItem: Ingredient) {
    this.ingredients[editedItemIndex] = editedItem;
    this.ingredientsChanged.next();
  }

  deleteIngredient(name) {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.name !== name);
    this.ingredientsChanged.next();
  }
}
