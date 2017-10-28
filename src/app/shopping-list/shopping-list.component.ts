import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import 'rxjs/add/operator/takeUntil';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StartEdit, StopEdit } from './store/shopping-list.actions';
import { AppState } from '../core/store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListStore: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<AppState>) { }

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
