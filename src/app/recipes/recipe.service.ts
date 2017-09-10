import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe1',
               'This is simply a test1',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe2',
               'This is simply a test2',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe3',
               'This is simply a test3',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe4',
               'This is simply a test4',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg')
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

}
