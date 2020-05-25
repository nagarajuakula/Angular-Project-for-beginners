import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map, isEmpty } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {

 recipes: Recipe[] = [];
// private recipes: Recipe[] = [new Recipe('A Test Recipe', 'Description of Recipe',
//   './assets/images/IMG_0069.JPG', [new Ingredient('Bread', 5), new Ingredient('Meat', 1)]),
// new Recipe('Another Test Recipe', 'Description of Another Recipe',
//   './assets/images/IMG_0077.JPG', [new Ingredient('Curry leaves', 5), new Ingredient('Potato', 2)])];
  selectedRecipe =  new EventEmitter<Recipe>();
  onRecipeAdded = new Subject<Recipe[]>();
  isLoading = false;

  constructor(private httpClient: HttpClient) { }

  getRecipeList(): Observable<Recipe[]> {
    if(this.recipes.length !== 0) {
      return of(this.recipes);
    }
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList.json', {
      reportProgress: true
    }).
    pipe(map(response => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.recipes.push({ ...response[key], id: key });
        }
      }
      return this.recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      },
      () => {
        console.log("in Complete recipe service");
        this.onRecipeAdded.next(this.recipes.slice());
      }
      );
    }));
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.httpClient.post<string>('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList.json', recipe, {
      reportProgress: true
    }).
    pipe(map(id => {
      recipe.id = id;
      this.recipes.push(recipe);
      this.onRecipeAdded.next(this.recipes.slice());
      this.isLoading = false;
    })).
    subscribe();
  }

  updateRecipe(index: number, recipe: Recipe) {
    const recipeKey = recipe.id["name"] ? recipe.id["name"] : recipe.id;
    this.httpClient.put('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList/' + recipeKey + '.json', recipe, {
      reportProgress: true
    }).
    subscribe(response => {
      this.recipes[index] = recipe;
      this.onRecipeAdded.next(this.recipes.slice());
      this.isLoading = false;
    });
  }

  deleteRecipe(index: number, recipeId: string) {
    const recipeKey = recipeId["name"] ? recipeId["name"] : recipeId;
    this.httpClient.delete('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList/' + recipeKey + '.json',
    {
      reportProgress: true
    }).
    subscribe(response => {
      this.recipes.splice(index, 1);
      this.onRecipeAdded.next(this.recipes.slice());
      this.isLoading = false;
    });
  }
}
