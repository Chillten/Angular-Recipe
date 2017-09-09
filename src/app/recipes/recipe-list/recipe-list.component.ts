import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('A test recipe1',
               'This is simply a test1',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe2',
               'This is simply a test2',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe3',
               'This is simply a test3',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg'),
    new Recipe('A test recipe4',
               'This is simply a test4',
               'http://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
