import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeService } from './serivces/recipe.service';
import { RecipesRoutingModule } from './recipes.routing.modue';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RecipesRoutingModule
    ],
    exports: [],
    providers: [
        RecipeService
    ]

})
export class RecipesModule {

}