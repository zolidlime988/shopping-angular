import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'A test recipe description',
      'https://findurthing.com/wp-content/uploads/2022/01/Tower-of-fantasy-Recipe-Fruit-Cake.png'
    ),
    new Recipe(
      'A test recipe2',
      'A test recipe description2',
      'https://findurthing.com/wp-content/uploads/2022/01/Tower-of-fantasy-Recipe-Fruit-Cake.png'
    )
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
