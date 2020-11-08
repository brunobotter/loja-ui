import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClienteModalDetalhesComponent } from './../cliente-modal-detalhes/cliente-modal-detalhes.component';
import { ClienteListDataSource } from './cliente-list-datasource';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Cliente } from './../../../shared/model/cliente';
import { RelatorioService } from './../../relatorio/relatorio.service';
import { ClienteFiltro, ClienteService } from './../cliente.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {  MatPaginator } from '@angular/material/paginator';
import { ClienteModalAtualizarComponent } from '../cliente-modal-atualizar/cliente-modal-atualizar.component';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Cliente>;

  displayedColumns = ['id', 'nome', 'telefone', 'email', 'detalhes',
  'atualizar'];
  ELEMENT_DATA : Cliente[] = [];
dataSource = new ClienteListDataSource(this.ELEMENT_DATA);
filtro = new ClienteFiltro();
dados: any;

   
 
  constructor(private service: ClienteService,
    private relatorioService: RelatorioService,
    public dialog: MatDialog
    ){
      
    }

  ngOnInit() {
    this.pesquisar();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  pesquisar(pagina = 0, limite = 5){
    this.filtro.page = pagina;
    this.filtro.limite = limite;
    this.service.pesquisar(this.filtro)
    .then(resultado =>{ 
      this.dataSource.data = resultado.cliente;
      this.dados = resultado.total;
    });
  } 

  onPaginateChange(event) {
    const pagina = event.pageIndex;
    const limite = event.pageSize;
    this.pesquisar(pagina, limite);
  }

relatorio(){
  this.relatorioService.pdf().subscribe((res: any)=>{
    this.relatorioService.handleFile(res, 'cliente.pdf');
  });
}



atualizar(idCliente){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = false;
  dialogConfig.width = "50%";
  dialogConfig.data = {idCliente};
  this.dialog.open(ClienteModalAtualizarComponent, dialogConfig).afterClosed().subscribe(res => {
  });
}

  detalhes(idCliente){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = {idCliente};
    this.dialog.open(ClienteModalDetalhesComponent, dialogConfig).afterClosed().subscribe(res => {
    });

}


carregarPagina(pagina) {
 
}

}
 