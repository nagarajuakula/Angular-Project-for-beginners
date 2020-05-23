import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] ;
  recipesList$: Observable<Recipe[]>;
  isLoading = false;

  constructor(private recipeService: RecipeService) {
   }

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeService.onRecipeAdded.subscribe(
      (modifiedRecipes: Recipe[]) => {
          this.recipes = modifiedRecipes;
    });
    this.recipesList$ = this.recipeService.getRecipeList();
    this.recipesList$.subscribe(
      recipeList => {
        this.recipes = recipeList;
        this.isLoading = false;
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
