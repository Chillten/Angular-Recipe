import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;

  ngUnsubscribe: Subject<void> = new Subject<void>();
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.startedEditing
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue(this.editedItem);
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(form.value.name, Number.parseInt(form.value.amount)));
    } else {
      this.shoppingListService.addIngredient(
        new Ingredient(form.value.name, Number.parseInt(form.value.amount))
      );
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
    this.shoppingListService.deleteIngredient(this.slForm.value.name);
    this.resetForm();
  }
}
