import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../common/model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addIngredient(
      new Ingredient(form.value.name, Number.parseInt(form.value.amount))
    );
  }
}
