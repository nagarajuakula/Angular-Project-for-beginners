import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
         RouterStateSnapshot, CanActivateChild, Router, CanLoad, Route } from '@angular/router'
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class CanActivateGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router,
                private loginService: LoginService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>  {
        // let customerId = this.custService.getCustomerById(+route.params['id']); 
        // return customerId ? true: false;
        if(this.loginService.isLoggedIn) {
            return true;
        }
        this.router.navigateByUrl("/login", {queryParams: {
            redirectTo: state.url
        }});
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>  {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;

        if(this.loginService.isLoggedIn) {
            return true;
        }
        this.router.navigate([url]);
        return false;
    }
}