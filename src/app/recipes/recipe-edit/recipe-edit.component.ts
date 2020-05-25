import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipes/serivces/recipe.service';
import { Recipe } from '../recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  isEditMode = false;
  editingRecipeId: number;
  recipe: Recipe;
  recipeForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.editingRecipeId = +params[`id`];
          if (!isNaN(this.editingRecipeId)) {
            this.recipe = this.recipeService.getRecipe(this.editingRecipeId);
            this.isEditMode = true;
          }
          this.initForm(this.recipe);
        }
      );

  }

  private initForm(recipe: Recipe) {
    let name = '';
    let description = '';
    let imagePath = '';
    const ingredientsForm = new FormArray([]);

    if (this.isEditMode) {
      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;
      if(recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          ingredientsForm.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount,
              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required, this.check),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: ingredientsForm
    });
  }

  check(control: AbstractControl): Promise<any> | Observable<any> {
      const usersList = ['raju', 'chandu'];
      let abc = new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (usersList.indexOf(control.value) > -1) {
                 resolve({'nameInvalid': true});
            } else {
              resolve(null);
            }
            }, 1500);
        });
      return abc;
    }
    
  addOrUpdateRecipe() {
    // below both are same
    // const name = this.recipeForm.value.name;
    // const name = this.recipeForm.get('name').value;
    
    if (this.isEditMode) {
      this.recipeForm.value.id = this.recipe.id["name"] ? this.recipe.id["name"] : this.recipe.id;
      this.recipeService.updateRecipe(this.editingRecipeId, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  deleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    this.isEditMode = false;
  }

  addIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl('')
      })
    );
  }
}
