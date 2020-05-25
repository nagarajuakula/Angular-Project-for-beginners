import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './serivces/shopping-list.service';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: 'shopping-list', 
                component: ShoppingListComponent
            }
        ])
    ],
    providers: [
        ShoppingListService
    ]
})
export class ShoppingListModule {}