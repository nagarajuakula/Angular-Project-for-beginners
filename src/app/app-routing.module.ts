import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { CanActivateGuard } from './customer-dashboard/guards/can-activate-guard';
import { RecipesResolverService } from './recipes/recipes-resolver-service';
import { AuthComponent } from './Auth/auth.component';

const appRoutes: Routes = [
    {
        path: 'login', 
        loadChildren: () => import('./Auth/auth.module').
                                then(m=>m.AuthModule)
    },
    { 
        path: '', redirectTo: '/recipes', pathMatch: 'full' 
    },
    { 
        path: 'customers', 
        loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m =>
            m.CustomerDashboardModule),
        canLoad: [CanActivateGuard],
    },
    {
    path: 'recipes', component: RecipesComponent, 
    resolve: { recipes: RecipesResolverService },
    children: [
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent }
    ]
    },
    { 
        path: 'shopping-list', 
        component: ShoppingListComponent
    },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        //preloadingStrategy: PreloadAllModules,
        // useHash: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
