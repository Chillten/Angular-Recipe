import { Ingredient } from '../common/model/ingredient.model';

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

  validate() {
    if (!this.name) {this.name = ''; }
    if (!this.description) {this.description = ''; }
    if (!this.imagePath) {this.imagePath = ''; }
    if (!this.ingredients) {this.ingredients = []; }
  }
}
