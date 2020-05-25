import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { EditcustomerComponent } from '../customers/edit-customer/editcustomer.component';

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
