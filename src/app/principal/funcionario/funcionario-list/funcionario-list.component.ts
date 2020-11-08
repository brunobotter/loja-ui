import { filter } from 'rxjs/operators';
import { FuncionarioDetalhesModalComponent } from './../funcionario-detalhes-modal/funcionario-detalhes-modal.component';
import { FuncionarioAtualizarModalComponent } from './../funcionario-atualizar-modal/funcionario-atualizar-modal.component';
import { FuncionarioService, FuncionarioFiltro } from './../funcionario.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FuncionarioListDataSource } from './funcionario-list-datasource';
import { Funcionario } from 'src/app/shared/model/funcionario';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Funcionario>;
 
 
  ELEMENT_DATA : Funcionario[] = [];
    displayedColumns = ['id', 'nome', 'telefone', 'email', 'detalhes', 'atualizar'];
    dataSource = new FuncionarioListDataSource(this.ELEMENT_DATA);
    filtro = new FuncionarioFiltro();
    dados: any;

  constructor(private service: FuncionarioService,
    public dialog: MatDialog){}
    
  ngOnInit() {
    this.pesquisar();
  }
 
  ngAfterViewInit() {
    this.dataSource = new FuncionarioListDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  pesquisar(pagina = 0, limite = 5){
    this.filtro.page = pagina;
    this.filtro.limite = limite;
    this.service.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      
      this.dataSource.data = resultado._embedded.funcionarioVoes;
      this.dados = resultado.page;
      console.log(this.dataSource.data)
      console.log(this.dados)
    });
  }

  onPaginateChange(event) {
    const pagina = event.pageIndex;
    const limite = event.pageSize;
    this.pesquisar(pagina, limite);
  }

  
  atualizar(idFuncionario){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = {idFuncionario};
    this.dialog.open(FuncionarioAtualizarModalComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }
  
    detalhes(idFuncionario){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = false;
      dialogConfig.width = "50%";
      dialogConfig.data = {idFuncionario};
      this.dialog.open(FuncionarioDetalhesModalComponent, dialogConfig).afterClosed().subscribe(res => {
      });
  
  }

  filtrando(event){
    
  }

  
}
