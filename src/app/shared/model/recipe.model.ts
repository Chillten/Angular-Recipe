import { Ingredient } from './ingredient.model';

export class Recipe {

  constructor(public name: string,
              public description: string,
              public imagePath: string,
              public ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }

  public static validate(recipe: Recipe) {
    if (!recipe.name) {
      recipe.name = '';
    }
    if (!recipe.description) {
      recipe.description = '';
    }
    if (!recipe.imagePath) {
      recipe.imagePath = '';
    }
    if (!recipe.ingredients) {
      recipe.ingredients = [];
    }
  }

  public static validateRecipes(recipes: Recipe[]) {
    recipes.forEach(Recipe.validate);
    return recipes;
  }
}
