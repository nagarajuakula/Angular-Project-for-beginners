import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  isRecipiesPresent = false;
  id: number;
  constructor(private slService: ShoppingListService,
              private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) {
   }

   ngOnInit() {
     this.activatedRoute.params.subscribe((params: Params) => {
       this.id = +params[`id`];
       this.recipe = this.recipeService.getRecipe(this.id);
       this.isRecipiesPresent = true;
     });
   }

   addToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
   }

   onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
   }

   onDeleteRecipe() {
     this.recipeService.deleteRecipe(this.id);
     this.router.navigate(['../'], {relativeTo: this.activatedRoute});
   }
}
