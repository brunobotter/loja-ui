import { ClienteService } from './../../../principal/cliente/cliente.service';
import { filter, map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-busca-modal',
  templateUrl: './cliente-busca-modal.component.html',
  styleUrls: ['./cliente-busca-modal.component.css']
})
export class ClienteBuscaModalComponent implements OnInit {

  queryFields = new FormControl();
  resultado$: Observable<any>;
  readonly FIELDS: 'nome';
  
  total: number;
  data: any;

  constructor(private http: HttpClient,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
   //lista todos
    this.resultado$= this.queryFields.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(100),
      distinctUntilChanged(),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.result
      )
    );
  }

    loadCiclosByEmpresa(nome: string) {
      this.clienteService.buscaPorNome(nome)
          .subscribe(response => this.data = response);
 

  }



    buscar(){
      let value = this.queryFields.value;
      this.loadCiclosByEmpresa(value);
      if(value && (value = value.trim()) !== ''){
      
      this.resultado$ = this.clienteService.buscaPorNome(value)
      .pipe(
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )
    }
  }
}
