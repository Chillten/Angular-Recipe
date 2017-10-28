import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shopping-list.actions';
import { Subject } from 'rxjs/Subject';
import { AppState } from '../../core/store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  ngUnsubscribe: Subject<void> = new Subject<void>();
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('shoppingList')
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.editedIndex > -1) {
            this.editedItem = data.editedItem;
            this.editMode = true;
            this.slForm.setValue(data.editedItem);
          } else {
            this.editMode = false;
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ ingredient: new Ingredient(form.value.name, Number.parseInt(form.value.amount)) }));
    } else {
      this.store.dispatch(new AddIngredient(new Ingredient(form.value.name, Number.parseInt(form.value.amount))));
    }
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.slForm.reset();
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteIngredient() {
    this.store.dispatch(new DeleteIngredient());
    this.resetForm();
  }
}
