import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
         RouterStateSnapshot, CanActivateChild, Router, CanLoad, Route } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanActivateGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private router: Router,
                private authService: AuthService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>  {
        if(this.authService.isLoggedIn) {
            return true;
        }
        this.router.navigate(["/login"], {queryParams: {
            redirectTo: state.url
        }});
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>  {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
         let url = `/${route.path}`;
        if(this.authService.isLoggedIn) {
            return true;
        }
        this.router.navigate(["/login"], {queryParams: {
            redirectTo: url
        }});
        return false;
    }
}