import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { EditcustomerComponent } from './customers/edit-customer/editcustomer.component';
import { CanActivateGuard } from './guards/can-activate-guard';
import { CanDeactivateServiceGuard } from './guards/can-deactivate-service.guard';
import { CustomerResolverService } from './guards/customer-resolver-service';

const routes: Routes = [
    // { path: 'login', pathMatch: 'full', component: LoginComponent },
    { 
        path: '', 
        component: CustomersComponent, 
        canActivateChild: [CanActivateGuard],
        resolve: { customers: CustomerResolverService} ,
        children: [
            {
                path: '',
                canActivateChild: [CanActivateGuard],
                children:[
                    {   
                        path: ':id/edit', 
                        component: EditcustomerComponent, 
                        canDeactivate: [CanDeactivateServiceGuard],
                    },
                    { 
                        path: 'add', 
                        component: EditcustomerComponent 
                    },
                ]
            }
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class CustomerRoutingModule {

}