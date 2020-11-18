import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = "http://localhost:8080/auth";

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router) 
    { }

  public login(login){
    return this.http.post(`${this.apiUrl}/login`, login, this.httpOption).subscribe(data =>{
      /*retorno http*/
      
      var token = JSON.parse(JSON.stringify(data))
      localStorage.setItem("token", token.token);
      this.router.navigate(['home']);
    },
      error => {
        console.error("Erro ao fazer o login");
        alert('Acesso Negado!')
      }
    );
    }
  
    userAutenticado(){
      if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
        return true;
      }else{
        return false;
      }
    }
}
 