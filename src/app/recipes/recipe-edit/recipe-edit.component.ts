import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../model/recipe.model';

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
              private recipeService: RecipeService) { }

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

  onSubmit() {
    console.log('Submit form');
    console.log(this.recipeForm);
  }

  private initForm() {
    if (this.editMode) {
      this.recipe = this.recipeService.getRecipeById(this.id);
    } else {
      this.recipe = new Recipe('', '', '', []);
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe.name),
      imagePath: new FormControl(this.recipe.imagePath),
      description: new FormControl(this.recipe.description)
    });
  }

}
