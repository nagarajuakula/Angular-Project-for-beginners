import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './serivces/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredientsList();
    this.slService.ingredientsChanged.
    subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  editIngredients(index: number) {
    this.slService.startedEditing.next(index);
  }
}
