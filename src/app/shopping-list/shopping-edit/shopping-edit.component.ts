import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') ingredientsForm: NgForm;
  editedIngredient: Ingredient;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.slService.getIngredientsList()[index];
        this.ingredientsForm.setValue({
          ingName: this.editedIngredient.name,
          ingAmount: this.editedIngredient.amount
        });
      });
  }

  addOrUpdateIngredient() {
    const ingName = this.ingredientsForm.value.ingName;
    const ingAmount = this.ingredientsForm.value.ingAmount;
    const ingredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
        this.slService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.ingredientsForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
