import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CustomerDashboardComponent } from './customer-dashboard.component';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { FilterNamesPipe } from './login/filterNames.pipe';
import { CustomDirective } from './directives/custom.directive';
import { CustomStructuralDirective } from './directives/custom-structural.directive';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customers/customer/customer.component';
import { EditcustomerComponent } from './customers/edit-customer/editcustomer.component';
import { UnlessDirective } from './directives/unless-directive';
import { CanActivateGuard } from './guards/can-activate-guard';
import { CanDeactivateServiceGuard } from './guards/can-deactivate-service.guard';
import { CustomerResolverService } from './guards/customer-resolver-service';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    LoginComponent,
    CustomersComponent,
    FilterNamesPipe,
    CustomDirective,
    CustomStructuralDirective,
    CustomerComponent,
    EditcustomerComponent,
    UnlessDirective
  ],
  exports: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    HttpClientModule
  ],
  providers: [
              CanDeactivateServiceGuard,
              CustomerResolverService
              ]
  //bootstrap: [CustComponent]
})
export class CustomerDashboardModule { }
