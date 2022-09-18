import { EventEmitter, Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'A test recipe',
          'A test recipe description',
          'https://findurthing.com/wp-content/uploads/2022/01/Tower-of-fantasy-Recipe-Fruit-Cake.png',
          [
            new Ingredients('meat', 1),
            new Ingredients('French Fries', 20),
          ]
        ),
        new Recipe(
          'A test recipe2',
          'A test recipe description2',
          'https://findurthing.com/wp-content/uploads/2022/01/Tower-of-fantasy-Recipe-Fruit-Cake.png',
          [
            new Ingredients('Buns', 2),
            new Ingredients('Meat', 1)
          ]
        )
      ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipe() {
        return this.recipes.slice()
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
    
}