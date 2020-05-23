import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {

//   private recipes: Recipe[] = [new Recipe('A Test Recipe', 'Description of Recipe',
//   'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/16:9/w_1200,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg'),
// new Recipe('Another Test Recipe', 'Description of Another Recipe',
//   'https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/16:9/w_1200,c_limit/Basically-Gojuchang-Chicken-Recipe-Wide.jpg')];

private recipes: Recipe[];
// private recipes: Recipe[] = [new Recipe('A Test Recipe', 'Description of Recipe',
//   './assets/images/IMG_0069.JPG', [new Ingredient('Bread', 5), new Ingredient('Meat', 1)]),
// new Recipe('Another Test Recipe', 'Description of Another Recipe',
//   './assets/images/IMG_0077.JPG', [new Ingredient('Curry leaves', 5), new Ingredient('Potato', 2)])];
  selectedRecipe =  new EventEmitter<Recipe>();
  onRecipeAdded = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient) { }

  getRecipeList(): Observable<Recipe[]> {
    this.recipes = [];
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList.json').
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
    // if (this.recipes.length > 0) {
    //   return this.recipes.slice();
    // }
    // return null;
    // return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.httpClient.post<string>('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList.json', recipe).
    pipe(map(id => {
      recipe.id = id;
      this.recipes.push(recipe);
      this.onRecipeAdded.next(this.recipes.slice());
    })).
    subscribe();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.httpClient.put('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList.json', this.recipes).
    subscribe(response => {
      this.onRecipeAdded.next(this.recipes.slice());
    });
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.httpClient.put('https://ng-recipe-book-2a04d.firebaseio.com/recipes/recipeList.json', this.recipes).
    subscribe(response => {
      this.onRecipeAdded.next(this.recipes.slice());
    });
  }
}
