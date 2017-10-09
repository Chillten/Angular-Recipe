import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../shared/model/recipe.model';
import { RecipeService } from '../recipe.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged
      .takeUntil(this.ngUnsubscribe)
      .subscribe(recipes => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
