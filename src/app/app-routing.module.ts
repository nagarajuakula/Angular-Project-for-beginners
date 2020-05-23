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
        path: 'login', component: AuthComponent
    },
    { 
        path: '', redirectTo: '/recipes', pathMatch: 'full' 
    },
    { 
        path: 'customers', 
        loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m =>
            m.CustomerDashboardModule)
    },
    {
    path: 'recipes', component: RecipesComponent, children: [
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },
        { 
            path: ':id/edit', 
            component: RecipeEditComponent, 
            resolve: { recipes: RecipesResolverService },
        }
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
