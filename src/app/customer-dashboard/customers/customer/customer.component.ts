import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Customer } from '../../../customer-dashboard/data/customer.model';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
    @Input()customer: Customer;
    editMode = false;

    constructor(
                private activatedRoute: ActivatedRoute,
                private router: Router,
                ) {
     }

     ngOnInit() {
         console.log("In cust component");
     }
}