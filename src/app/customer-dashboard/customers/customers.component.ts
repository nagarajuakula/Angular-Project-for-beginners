import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../data/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  isCustomerChanged = new Subject<Customer>();
  customersList$: Observable<Customer[]>;

  constructor(public customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // using Resolver to pre-fetch data
    this.activatedRoute.data.subscribe((data : { customers: Customer[]}) => {
      this.customers = data.customers;
      this.customerService.isLoading = false;
    });

    this.customerService.customersUpdated.subscribe(customers => {
      this.customers = customers;
    });
    //this.getCustomers();
  }

  // getCustomers() {
  //   this.customersList$ = this.customerService.getCustomers();
  //   this.customersList$.subscribe(
  //     customersList => {
  //       this.isLoading = false;
  //       this.customers = customersList;
  //     },
  //     error => {
  //       console.log('Error is ' + error.message);
  //     }
  //   );
  //   this.customerService.customersUpdated.subscribe(customers => {
  //     this.customers = customers;
  //   });
  // }

  addCustomer() {
    this.router.navigate(["add"], {relativeTo: this.activatedRoute});
  }

  onCustomerSelected(id: number) {
    this.router.navigate([id, "edit"], {relativeTo: this.activatedRoute});
  }

  // deleteCustomer(id: number) {
  //   this.customerService.deleteCustomer(id);
  //   this.customerService.customersUpdated.subscribe(customers => {
  //     this.customers = customers;
  //   });
  // }
}
