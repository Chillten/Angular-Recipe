import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../common/model/ingredient.model';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<void>();

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
    this.ingredientsChanged.emit();
  }

  addToIngredientList(list: Ingredient[]) {
    for (const ingredient of list) {
      this.pushNewIngredient(ingredient);
    }
    this.ingredientsChanged.emit();
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
}
