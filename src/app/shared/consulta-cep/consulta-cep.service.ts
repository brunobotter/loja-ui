import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCep(cep: string){
    cep = cep.replace(/\D/g, '');
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if( validacep.test(cep)) {
      
       return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
     
      }
    }
    return of ({});
  }

}
