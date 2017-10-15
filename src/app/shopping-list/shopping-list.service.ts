import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { AddIngredients, DeleteIngredient, UpdateIngredient } from './store/shopping-list.actions';
import { StoreModel } from '../shared/model/store.model';

@Injectable()
export class ShoppingListService {
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
    this.store.dispatch(new UpdateIngredient({ index: editedItemIndex, ingredient: editedItem }));
  }

  deleteIngredient(editedItemIndex: number) {
    this.store.dispatch(new DeleteIngredient({ index: editedItemIndex - 1 }));
  }
}
