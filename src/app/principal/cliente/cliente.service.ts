import { ResponsePageble } from './../../../../../agendalive/src/app/shared/model/responsePageble.model';
import { map,  tap } from 'rxjs/operators';
import { Cliente } from './../../shared/model/cliente';
import { QueryBuilder, Page } from './../../shared/model/paginacao';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ClienteFiltro {
  nome: string;
  page = 0;
  limite = 5;
}
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl = "http://localhost:8080/api/cliente";
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


pesquisar(filtro: ClienteFiltro): Promise<any>{
  let params = new HttpParams()
  .set('page', filtro.page.toString())
  .set('limite', filtro.limite.toString());
  if(filtro.nome){
    params = params.set('nome', filtro.nome);
  }

return this.http.get<any>(`${this.apiUrl}`, {params})
.toPromise()
.then(response =>{
  const cliente = response._embedded.clienteVoes;
  const resultado = {
    cliente,
    total: response.page
  };
  return resultado
})
}

public buscaPorNome( nome: string):  Observable<any>{
  return this.http.get(`${this.apiUrl}/busca_por_nome?=${nome}`);
}


public listaPorId(id:number):  Observable<any>{
  return this.http.get(`${this.apiUrl}/${id}`);
}

public salvar(dados):  Observable<any>{
  return this.http.post<any>(this.apiUrl, dados, this.httpOption);
}


public deleteContato(dados): Observable<any>{
  return this.http.delete(`${this.apiUrl}/${dados}`);
}


public editarContato(id, pessoa): Observable<any>{
  const url = `${this.apiUrl}/${id}`;
  return this.http.put(url, pessoa, this.httpOption );
}



}
 