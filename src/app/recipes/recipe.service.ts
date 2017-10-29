import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../shared/model/recipe.model';
import { Ingredient } from '../shared/model/ingredient.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

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

  constructor() {
    this.recipesChanged = new Subject<Recipe[]>();
  }


  ngOnInit(): void {
    this.recipesChanged = new Subject<Recipe[]>();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }
}
