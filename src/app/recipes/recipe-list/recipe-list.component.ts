import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe', 'This is simply a test', 'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe', 'This is simply a test', 'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe', 'This is simply a test', 'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
