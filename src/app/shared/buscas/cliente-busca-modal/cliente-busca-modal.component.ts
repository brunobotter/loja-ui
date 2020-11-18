import { ClienteService } from './../../../principal/cliente/cliente.service';
import { filter, map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OSFiltro } from 'src/app/principal/os/os.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-busca-modal',
  templateUrl: './cliente-busca-modal.component.html',
  styleUrls: ['./cliente-busca-modal.component.css']
})
export class ClienteBuscaModalComponent implements OnInit {

  filtro = new OSFiltro();
  data: any;
  constructor(private clienteService: ClienteService,
    public dialogRef: MatDialogRef<ClienteBuscaModalComponent>) { }

  ngOnInit(): void {
    this.clienteService.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.data = resultado.cliente;
    });
  }


  pesquisar(nome =''){
    this.filtro.nome = nome;
    this.clienteService.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      console.log(resultado)
      this.data = resultado.cliente;
    });
  }  
  
  filtrando(event){
    const pagina = 0;
    const limite = 100;
    let nome = event;
    this.pesquisar(nome);
  }

  seleciona(id){
    this.clienteService.listaPorId(id).subscribe(data =>{
      this.cancel(data);
    })
  }

  cancel(data){
    this.dialogRef.close(data);
  } 
}
