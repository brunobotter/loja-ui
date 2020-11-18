import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

formLogin: FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario();
    if(localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null ){
      this.router.navigate(['home']);
    }
  }

  formulario(){
    this.formLogin = this.fb.group({
      username: [null],
      password: [null]
    })
  }

  public login(){
    this.loginService.login(this.formLogin.value);
  }

}
