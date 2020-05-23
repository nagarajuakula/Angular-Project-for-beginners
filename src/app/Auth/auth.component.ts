import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth-component.html'
})
export class AuthComponent {

    message: string;
    constructor(public authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {}

    onSubmit(form: NgForm) {
        let email = form.controls.email;
        let password = form.controls.password;
        this.login();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
      }

      login() {
        this.message = 'Trying to log in ...';
        const queryParams = this.activatedRoute.snapshot.queryParams;
        const redirectUrl = queryParams ? queryParams['redirectTo'] : null;
        this.authService.checkLogin().subscribe( () => {
          this.setMessage();
          this.authService.isLoggedIn = true;
          if(redirectUrl) {
            // redirecting to original page after login
           this.router.navigateByUrl(redirectUrl);
          }
        });
        
        // const queryParams = this.activatedRoute.snapshot.queryParams;
        // const redirectUrl = queryParams ? queryParams['redirectTo'] : null;
        // if(redirectUrl) {
        //   // redirecting to original page after login
        //  this.router.navigateByUrl(redirectUrl);
        // }
      }
    
      logout() {
        this.authService.isLoggedIn = false;
        this.authService.logout();
        this.setMessage();
      }
}