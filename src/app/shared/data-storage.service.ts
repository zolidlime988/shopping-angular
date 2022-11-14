import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService, respLogin } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private httpService: HttpClient,
                private recipeService : RecipeService,
                private authService: AuthService
    ) {}
    url: string = 'https://ng-apiwat-recipes-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
    storedToken: string = '';

    storedRecipes() {
        // get recipe array
        const storedRecipes = this.recipeService.getRecipes();

        // store date to server
        this.httpService.put(this.url, storedRecipes)
        .subscribe(obs => { console.log(obs) })
    }

    getRecipes() {
        // set data to website
        return this.httpService
            .get(this.url)
            .pipe(
            map((val: Recipe[]) => { 
                return val.map(val => { return {...val, ingredients: val.ingredients? val.ingredients : []} })
            }), tap((val: Recipe[]) => { 
                this.recipeService.setRecipe(val) 
            }))
    }


}