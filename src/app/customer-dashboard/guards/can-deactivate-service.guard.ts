import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerDashboardModule } from '../customer-dashboard.module';
import { Customer } from '../data/customer.model';
import { EditcustomerComponent } from '../customers/edit-customer/editcustomer.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
 }

@Injectable()
export class CanDeactivateServiceGuard implements  CanDeactivate<EditcustomerComponent> {
  canDeactivate(
    component: EditcustomerComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
