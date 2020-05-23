import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth-component.html'
})
export class AuthComponent implements OnInit {

    message: string;
    redirectMessage: string;
    redirectUrl: string;

    constructor(public authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      this.redirectUrl = queryParams ? queryParams['redirectTo'] : null;
      if(this.redirectUrl) {
        this.redirectMessage = "Please login to view 'Customers' page";
      }
    }
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
        
        this.authService.checkLogin().subscribe( () => {
          this.setMessage();
          if(this.redirectUrl) {
            // redirecting to original page after login
            this.router.navigateByUrl(this.redirectUrl);
          }
        });
      }
    
      logout() {
        this.authService.logout();
        this.setMessage();
      }
}
