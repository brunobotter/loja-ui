import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from 'src/app/shared/model/funcionario';

export class FuncionarioFiltro {
  nome: string;
  page = 0;
  limite = 5;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  apiUrl = "http://localhost:8080/api/funcionario";
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  pesquisar(filtro: FuncionarioFiltro): Observable<any>{
    let params = new HttpParams()
    .set('page', filtro.page.toString())
    .set('limite', filtro.limite.toString());
    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }
  
  return this.http.get<any>(`${this.apiUrl}`, {params})
  .pipe();
  }



  public listaTodos():  Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.apiUrl);
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
  
  
  public atualizar(id, dados): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, dados, this.httpOption);
  }


}
