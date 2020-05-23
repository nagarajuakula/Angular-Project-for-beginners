import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isLoggedIn = false;

    checkLogin():  Observable<boolean> {
        return of(true).
        pipe(delay(2000),
        tap(data => {
            this.isLoggedIn = true;
        }));
    }

    logout() {
        this.isLoggedIn = false;
    }
}