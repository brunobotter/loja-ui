import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class OSFiltro {
  nome: string;
  page = 0;
  limite = 5;
}

@Injectable({
  providedIn: 'root'
})
export class OsService {
  apiUrl = "http://localhost:8080/api/os";
  apiUrlCom = "http://localhost:8080/api/comentario";
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      
    })
  };
  constructor(private http: HttpClient) { }
  

  pesquisar(filtro: OSFiltro): Promise<any>{
    let params = new HttpParams()
    .set('page', filtro.page.toString())
    .set('limite', filtro.limite.toString());
    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }
  
  return this.http.get<any>(`${this.apiUrl}`, {params})
  .toPromise()
  .then(response =>{
    const ordemServico = response._embedded.osVoes;
    const resultado = {
      ordemServico,
      total: response.page
    };
    return resultado
  })
  }
 
  public listaTodos():  Observable<any>{
    return this.http.get(this.apiUrl);
  }

  public buscaPorId(id: number): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  public adiciona(dados): Observable<any>{
    return this.http.post(this.apiUrl, dados, this.httpOption);
  }

  public atualizar(dados): Observable<any>{
    const url = `${this.apiUrl}`;
    return this.http.put(url, dados, this.httpOption);
  }

  public deletar(id): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  public finalizarOs(id:number): Observable<any>{
    const url = `${this.apiUrl}/${id}/finalizada`
    return this.http.put(url, this.httpOption); 
  }

  /**Comentario */

  public adicionaComentario(comentario, osId: number): Observable<any>{
    const url = `${this.apiUrlCom}/os/${osId}`;
    return this.http.put(url, comentario, this.httpOption);
  }

  public buscarComentarioIdOs(idOs:number): Observable<any>{
    const url = `${this.apiUrlCom}/os/${idOs}`;
    return this.http.get(url);
  }

  public deletaComentario(idOs:number): Observable<any>{
    const url = `${this.apiUrlCom}/os/comentario/${idOs}`;
    return this.http.delete(url);
}

}
