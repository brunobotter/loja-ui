import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  urlCliente = "http://localhost:8080/cliente";
  constructor(private http: HttpClient) { }


public pdf(){
  return this.http.get(`${this.urlCliente}/gerarpdf`, {responseType: 'blob' as 'json'});
}

handleFile(res: any, fileName){
  const file = new Blob([res],{
    type: res.type
  });

  //IE
  if( window.navigator && window.navigator.msSaveOrOpenBlob){
    window.navigator.msSaveOrOpenBlob(file);
    return;
  }
  const blob = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = blob;
  link.download = fileName;
 //Para funcionar tanto no FIrefox e chrome
  link.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }));

  setTimeout(()=>{ // para firefox, chrome nao precisa
    window.URL.revokeObjectURL(blob);
    link.remove();
  },100)
}

}