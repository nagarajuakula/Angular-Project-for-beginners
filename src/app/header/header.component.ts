import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../Auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(public authService: AuthService,
                private router: Router) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
