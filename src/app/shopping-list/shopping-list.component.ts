import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import 'rxjs/add/operator/takeUntil';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListStore: Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: { ingredients: Ingredient[] }}>) { }

  ngOnInit() {
    this.shoppingListStore = this.store.select('shoppingList');
  }

  editItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }
}
