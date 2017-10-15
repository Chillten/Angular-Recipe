import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import 'rxjs/add/operator/takeUntil';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../shared/model/store.model';
import { StartEdit, StopEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListStore: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<StoreModel>) { }

  ngOnInit() {
    this.shoppingListStore = this.store.select('shoppingList');
  }

  editItem(i: number) {
    this.store.dispatch(new StartEdit({ index: i }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopEdit());
  }
}
