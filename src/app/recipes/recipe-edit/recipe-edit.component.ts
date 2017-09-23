import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../model/recipe.model';
import { Ingredient } from '../../common/model/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initRecipe();
        this.initForm();
        console.log(this.editMode);
      }
    );
  }

  private initForm() {
    this.recipeForm = this.formBuilder.group(
      {
        name: [this.recipe.name, Validators.required],
        imagePath: [this.recipe.imagePath, Validators.required],
        description: [this.recipe.description, Validators.required],
        ingredients: this.formBuilder.array([])
      }
    );
    if (this.recipe) {
      this.recipe.ingredients.forEach(
        ingredient => (<FormArray>this.recipeForm.get('ingredients'))
          .push(this.createItem(ingredient)));
    }
  }

  private initRecipe() {
    this.recipe = this.editMode ? this.recipeService.getRecipeById(this.id) : new Recipe('', '', '', []);
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createItem());
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private createItem(ingredient = new Ingredient('', 0)): FormGroup {
    return this.formBuilder.group({
      name: [ingredient.name, Validators.required],
      amount: [ingredient.amount,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
    });
  }

  getIngredients(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.navigateOut();
  }

  navigateOut() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
