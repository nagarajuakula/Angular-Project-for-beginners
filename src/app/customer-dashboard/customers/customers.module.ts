import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { EditcustomerComponent } from './edit-customer/editcustomer.component';



@NgModule({
  declarations: [CustomersComponent, EditcustomerComponent],
  imports: [
    CommonModule
  ]
})
export class CustomersModule { }
