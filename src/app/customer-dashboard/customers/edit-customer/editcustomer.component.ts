import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

import { Customer } from 'src/app/customer-dashboard/data/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent implements OnInit {

  @ViewChild('f') editCustForm: NgForm;
  @Input()editCustomer: Customer;
  customerKey: string;
  customerId: number;
  isEditMode = false;

  constructor(private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // code to apply when customer id changes in customers page
    this.activatedRoute.params.subscribe((params: Params) => {
      this.customerId = +params[`id`];
      if(this.customerId) {
        this.isEditMode = true;
        // To avoid error when we load edit customer page directly, use resolver
        this.editCustomer = this.customerService.getCustomerById(this.customerId);

      }else {
        this.editCustomer = new Customer("", "", "", this.customerService.lastAddedUserId + 1, false, "");
      }
      this.customerKey = this.editCustomer.key;
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if(!this.editCustForm.submitted && 
      (this.editCustomer.name !== this.editCustForm.value.name)) {
      return this.customerService.confirm('Discard changes?');
    }
    return true;
  }
  
  saveCustomer() {
    if( this.isEditMode ) {
      this.editCustomer.editMode = false;
      this.customerService.updateCustomer(this.customerId, this.customerKey, this.editCustForm.value);
    } else {
      this.customerService.addCustomer(this.editCustForm.value);
    }
    
    this.router.navigate(['/customers'], {relativeTo: this.activatedRoute});
  }

  onCancel() {
    this.editCustomer.editMode = false;
    this.router.navigate(['/customers']);
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId, this.customerKey);
    this.router.navigate(['/customers'], {relativeTo: this.activatedRoute});
  }

}
