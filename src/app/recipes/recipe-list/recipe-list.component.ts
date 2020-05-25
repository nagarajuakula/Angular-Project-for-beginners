import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../serivces/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesList$: Observable<Recipe[]>;

  constructor(public recipeService: RecipeService) {
   }

  ngOnInit(): void {
    this.recipeService.isLoading = true;
    this.recipeService.onRecipeAdded.subscribe(
      (modifiedRecipes: Recipe[]) => {
          this.recipeService.recipes = modifiedRecipes;
    });
    this.recipesList$ = this.recipeService.getRecipeList();
    this.recipesList$.subscribe(
      recipeList => {
        this.recipeService.recipes = recipeList;
        this.recipeService.isLoading = false;
      },
      error => {
        console.log('Error is ' + error.message);
      }
    );
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
}
