import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { Observable } from 'rxjs/Observable';
import { RecipeAppState, RecipeState } from '../store/recipe.reducers';
import { DeleteRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<RecipeState>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<RecipeAppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  sendToShoppingList() {
    console.log('RecipeDetailComponent.sendToShoppingList call addToIngredientList');
    this.store.select('recipes')
      .take(1)
      .subscribe(
        (recipeState: RecipeState) => {
          this.store.dispatch(new AddIngredients(recipeState.recipesList[this.id].ingredients));
        }
      );
  }

  deleteRecipe() {
    this.store.dispatch(new DeleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }
}
