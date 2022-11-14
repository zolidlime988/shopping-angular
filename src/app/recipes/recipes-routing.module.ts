import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { ResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const recipesRoutes: Routes = [
      { 
         path: '', 
         component: RecipesComponent, 
         children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [ResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [ResolverService] }
      ], canActivate : [AuthGuard]
   },
]
@NgModule({
   imports: [RouterModule.forChild(recipesRoutes)],
   exports: [RouterModule]
})
export class RecipesRoutingModule {

}