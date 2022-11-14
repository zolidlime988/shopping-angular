import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();
    
    private ingredients:Ingredients[] = [
        new Ingredients('Apple',5),
        new Ingredients('Orange',3)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(id: number) {
        return this.ingredients[id]
    }

    addIngredient(ingredient:Ingredients) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredients[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient:Ingredients) {
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
        console.log(this.ingredients[index]);
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}