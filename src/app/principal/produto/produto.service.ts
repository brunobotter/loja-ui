import { Produto } from './../../shared/model/produto';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProdutoFiltro {
  nome: string;
  page = 0;
  limite = 5;
  order = 'asc';
}
@Injectable({
  providedIn: 'root'
})


export class ProdutoService {
  apiUrl = "http://localhost:8080/api/produto";
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }; 

  constructor(private http: HttpClient) { }

  pesquisar(filtro: ProdutoFiltro): Promise<any>{
    let params = new HttpParams()
    .set('page', filtro.page.toString())
    .set('limite', filtro.limite.toString())
    
    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }
  
  return this.http.get<any>(`${this.apiUrl}`, {params})
  .toPromise()
  .then(response =>{
    const produto = response._embedded.produtoVoes;
    const resultado = {
      produto,
      total: response.page
    };
    return resultado
  })
  }
  
  public listaTodos():  Observable<any>{
    return this.http.get(this.apiUrl);
  }
  
  
  public listaPorId(id:number):  Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  public salvar(dados):  Observable<Produto>{
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
