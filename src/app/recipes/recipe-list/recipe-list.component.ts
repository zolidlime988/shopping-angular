import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'A test recipe description',
      'https://findurthing.com/wp-content/uploads/2022/01/Tower-of-fantasy-Recipe-Fruit-Cake.png'
    )
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
