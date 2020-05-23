import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Observable, EMPTY, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private router: Router, private recipeService: RecipeService) {

    }

    resolve( actRoute: ActivatedRouteSnapshot,
             state: RouterStateSnapshot) : Observable<Recipe[]> {
                return this.recipeService.getRecipeList().pipe(
                    take(1),
                    mergeMap(recipes => {
                      if (recipes) {
                        return of(recipes);
                      } else { // no customers present
                        this.router.navigate(['/recipes']);
                        return EMPTY;
                      }
                    })
                  );;
            }

}