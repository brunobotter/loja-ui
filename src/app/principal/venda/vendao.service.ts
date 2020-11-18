import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export class vendaFiltro {
  nome: string;
  page = 0;
  limite = 5;
}
@Injectable({
  providedIn: 'root'
})
export class VendaoService {
  apiUrl = "http://localhost:8080/api/venda";
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }


  pesquisar(filtro: vendaFiltro): Observable<any>{
    let params = new HttpParams()
    .set('page', filtro.page.toString())
    .set('limite', filtro.limite.toString());
    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }
  
  return this.http.get<any>(`${this.apiUrl}/busca_por_nome/`, {params})
  .pipe(map(response =>{
    const venda = response._embedded.vendas;
    const resultado = {
      venda,
      total: response.page
    }
    return resultado
    
  }));
  }
  public listaTodos():  Observable<any>{
    return this.http.get(this.apiUrl);
  }

  public listaVendaPorId(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  public calculaVendas(idVenda: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/calcula/${idVenda}`)
  }

  public salvar(dados):  Observable<any>{
    return this.http.post<any>(this.apiUrl, dados, this.httpOption);
  }
  
  
  public deletarPorId(id): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  
  public atualizar(id, dados): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, dados, this.httpOption);
  }

  public finalizarVenda(id:number, desconto:number): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}/${desconto}/finalizada`, this.httpOption); 
  }

/**Itens */

public listaItemPorVenda(idVenda:number): Observable<any>{
  return this.http.get(`${this.apiUrl}/item/${idVenda}`);
}

public buscarItemPorId(idItem: number): Observable<any>{
  return this.http.get(`${this.apiUrl}/item/busca/${idItem}`);
}

public adicionaItem(dados, idVenda:number, idProd:number): Observable<any>{
  const url = `${this.apiUrl}/adicionar/${idVenda}/${idProd}`;
  return this.http.put(url, dados, this.httpOption);
}

public deletaItemPorId(idItem: number):Observable<any>{
  const url = `${this.apiUrl}/item/${idItem}`;
  return this.http.delete(url);
}

}
