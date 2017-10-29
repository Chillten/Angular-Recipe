import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipeAppState, RecipeState } from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeState>;

  constructor(private store: Store<RecipeAppState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
}
