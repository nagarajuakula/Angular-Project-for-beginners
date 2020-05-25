import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RecipesComponent } from './recipes.component';
import { RecipesResolverService } from './serivces/recipes-resolver-service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipeRoutes: Routes = [
    {
        path: 'recipes', component: RecipesComponent, 
        resolve: { recipes: RecipesResolverService },
        children: [
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(recipeRoutes) ],
    exports: [ RouterModule ]
})
export class RecipesRoutingModule{

}