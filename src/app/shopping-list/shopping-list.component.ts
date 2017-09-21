import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../common/model/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.updateIngredientList();
    this.shoppingListService.ingredientsChanged
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => this.updateIngredientList());
  }

  updateIngredientList() {
    this.ingredients = this.shoppingListService.getAllIngredients();
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
