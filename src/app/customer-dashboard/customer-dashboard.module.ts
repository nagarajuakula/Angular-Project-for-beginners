import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CustomerDashboardComponent } from './customer-dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomDirective } from './directives/custom.directive';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customers/customer/customer.component';
import { EditcustomerComponent } from './customers/edit-customer/editcustomer.component';
import { UnlessDirective } from './directives/unless-directive';
import { CanDeactivateServiceGuard } from './guards/can-deactivate-service.guard';
import { CustomerResolverService } from './guards/customer-resolver-service';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomersComponent,
    CustomDirective,
    CustomerComponent,
    EditcustomerComponent,
    UnlessDirective
  ],
  exports: [
    // CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    //HttpClientModule
  ],
  providers: [
              CanDeactivateServiceGuard,
              CustomerResolverService
              ]
  //bootstrap: [CustComponent]
})
export class CustomerDashboardModule { }
