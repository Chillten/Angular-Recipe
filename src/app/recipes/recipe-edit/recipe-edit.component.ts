import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Store } from '@ngrx/store';
import { RecipeAppState, RecipeState } from '../store/recipe.reducers';
import { AddRecipe, UpdateRecipe } from '../store/recipe.actions';
import { Recipe } from '../../shared/model/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<RecipeAppState>) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      }
    );
  }

  private initForm() {
    this.store.select('recipes').take(1).subscribe(
      (recipeState: RecipeState) => {
        const recipe = recipeState.recipesList[this.id] ?
          recipeState.recipesList[this.id] : new Recipe('', '', '', []);
        this.recipeForm = this.formBuilder.group(
          {
            name: [recipe.name, Validators.required],
            imagePath: [recipe.imagePath, Validators.required],
            description: [recipe.description, Validators.required],
            ingredients: this.formBuilder.array([])
          }
        );
        recipe.ingredients.forEach(
            ingredient => (<FormArray>this.recipeForm.get('ingredients'))
              .push(this.createItem(ingredient)));
      }
    );
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
      this.store.dispatch(new UpdateRecipe({ index: this.id, updateRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new AddRecipe({ recipe: this.recipeForm.value }));
    }
    this.navigateOut();
  }

  navigateOut() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
