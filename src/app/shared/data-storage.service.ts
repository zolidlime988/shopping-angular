import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {
    constructor(private httpService: HttpClient,
                private recipeService : RecipeService,
    ) {}
    url: string = 'https://ng-apiwat-recipes-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'

    storedRecipes() {
        // get recipe array
        const storedRecipes = this.recipeService.getRecipes();

        // store date to server
        this.httpService.put(this.url, storedRecipes)
        .subscribe(obs => { console.log(obs) })
    }

    getRecipes() {
        // set data to website
        return this.httpService.get(this.url)
        .pipe(map((val: Recipe[]) => {
            return val.map(val => { return {...val, ingredients: val.ingredients? val.ingredients : []} })
        }),
        tap((val: Recipe[]) => {
            this.recipeService.setRecipe(val)
        }))
    }
}