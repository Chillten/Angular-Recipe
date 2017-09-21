import { Injectable } from '@angular/core';
import { Ingredient } from '../common/model/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new Subject<void>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Orange', 10)
  ];

  constructor() { }

  getAllIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.pushNewIngredient(ingredient);
    this.ingredientsChanged.next();
  }

  addToIngredientList(list: Ingredient[]) {
    for (const ingredient of list) {
      this.pushNewIngredient(ingredient);
    }
    this.ingredientsChanged.next();
  }

  private pushNewIngredient(ingredient: Ingredient) {
    let found = false;
    for (let i = 0; i < this.ingredients.length; i += 1) {
      if (this.ingredients[i].name === ingredient.name) {
        found = true;
        this.ingredients[i].amount += ingredient.amount;
      }
    }
    if (!found) {
      this.ingredients.push(ingredient);
    }
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
