import { Component, OnInit, ViewEncapsulation, Output, ContentChild,
  ViewChild,  ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit {

  cname: string;
  @ViewChild('password') password: ElementRef;
  @Output("pwd") pwd = new EventEmitter<string>();
  @ContentChild('login') content: ElementRef;
  loginForm: FormGroup;
  isSubmitted = false;
  forbiddenNames = ['raju', 'test'];
  message: string;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.forbiddenName.bind(this)]),
      password: new FormControl('', Validators.required)
    });
  }

  setMessage() {
    this.message = 'Logged ' + (this.loginService.isLoggedIn ? 'in' : 'out');
  }

  submit() {
    this.isSubmitted = true;
     // console.log(this.loginForm);
  }

  forbiddenName(nameControl: FormControl): {[forbidden: string]: boolean} {
    if (this.forbiddenNames.indexOf(nameControl.value) !== -1) {
      return {forbidden: true};
    }

    return null;
  }

  login() {
    this.message = 'Trying to log in ...';
    this.loginService.checkLogin().subscribe( () => {
      this.setMessage();
      this.loginService.isLoggedIn = true;
    });
  }

  logout() {
    this.loginService.isLoggedIn = false;
    this.loginService.logout();
    this.setMessage();
  }

  ngAfterViewInit() {
    //console.log('contet in init ' + this.content.nativeElement.value);
  }
}
