import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

import { Customer } from '../data/customer.model';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class CustomerResolverService implements Resolve<Customer[]> {
    constructor(private custService: CustomerService,
                private router: Router){}

    resolve(routerSnapshot: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Customer[]> {
            return this.custService.getCustomers().pipe(
      take(1),
      mergeMap(customers => {
        if (customers) {
          return of(customers);
        } else { // no customers present
          this.router.navigate(['/customers']);
          return EMPTY;
        }
      })
    );
    }

}