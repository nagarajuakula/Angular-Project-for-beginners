import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../data/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  private customers: Customer[] ;

  customersUpdated = new Subject<Customer[]>();
  lastAddedUserId: number;
  isLoading = false;

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    // this.customersUpdated.subscribe(customers => {
    //   this.customers = customers;
    // });

    // using interceptor to make isLoading = true, so that spinner works
    this.customers = [];
    return this.httpClient.get<Customer[]>('https://ng-recipe-book-2a04d.firebaseio.com/customers/customerList.json',
    {
      reportProgress: true
    }).
    pipe(map(response => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.customers.push({ ...response[key], key: key});
        }
      }
      this.lastAddedUserId = this.customers.length > 0 ? this.customers[this.customers.length - 1].id : 0;
      return this.customers.map(customer => {
        return { ...customer};
      },
      );
    }));
  }

  getCustomerById(id: number) {
    /*return this.customers.find(customer => { 
      if( customer.id === id ) {
        //customer.editMode = true;
        return customer;
      }
    });*/
	
	return this.customers.find(customer => customer.id === id);
  }

  updateCustomer(id: number, key: string, updatedCustomer: Customer) {
    // using interceptor to make isLoading = true, so that spinner works
    const url = 'https://ng-recipe-book-2a04d.firebaseio.com/customers/customerList/' + key + '.json';
    this.httpClient.put<Customer>(url, updatedCustomer, {reportProgress: true}).
    pipe(map(result => {
      for(let i = 0; i < this.customers.length; i++) {
        if(this.customers[i].id === id) {
          this.customers.splice(i, 1);

          // add the key to the modified user
          updatedCustomer.key = key;
          this.emitCustomersInfo(updatedCustomer);
        }
      }
      this.isLoading = false;
    })).
    subscribe(
      error => {
        console.log("Error in update Customer");
        console.log(error);
      }
      
    );
    
  }

  addCustomer(newCustomer: Customer) {
    
    this.httpClient.post<string>('https://ng-recipe-book-2a04d.firebaseio.com/customers/customerList.json', newCustomer)
    .subscribe(result => {
      newCustomer.key = result['name'];
      this.emitCustomersInfo(newCustomer);
      this.lastAddedUserId += 1;
    });
  }

  /*
   * deleting customer whose Id matches
   */
  deleteCustomer(customerId: number, customerKey: string) {
    
    this.httpClient.delete('https://ng-recipe-book-2a04d.firebaseio.com/customers/customerList/' + customerKey + '.json', {
      reportProgress: true
    })
    .subscribe(result => {
      for( let i=0; i< this.customers.length; i++) {
        if(this.customers[i].key === customerKey) {
          this.customers.splice(i, 1);
          break;
        }
      }
      this.emitCustomersInfo();
    })
  }

  /*  
   * emitting customer list update information
   * to all subscribers
   */
  emitCustomersInfo(updatedCustomer?: Customer) {
    if(updatedCustomer) {
      this.customers.push(updatedCustomer);
    }
    this.customersUpdated.next(this.customers.slice());
  }

  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns observable resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  };
}
