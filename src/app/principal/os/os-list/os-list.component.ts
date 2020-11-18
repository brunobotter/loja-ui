import { DialogService } from './../../../shared/dialog-modal/dialog.service';
import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OsService, OSFiltro } from './../os.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Os } from 'src/app/shared/model/os';
import { OsListDataSource } from './os-list-datasource';
import { OsModalComponent } from '../os-modal/os-modal.component';
import { OsModalDetalhesComponent } from '../os-modal-detalhes/os-modal-detalhes.component';

@Component({
  selector: 'app-os-list',
  templateUrl: './os-list.component.html',
  styleUrls: ['./os-list.component.css']
})
export class OsListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Os>;
  ELEMENT_DATA : Os[] = [];
  dataSource = new OsListDataSource(this.ELEMENT_DATA);
  filtro = new OSFiltro();
  dados: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'dataEntrada', 'preco', 'dataSaida', 'status', 'cliente', 'funcionario', 'editar',
'comentarios', 'deletar'];

  constructor(private service: OsService,
    public dialog: MatDialog,
    private snackbar: BarraService,
    private modelService: DialogService){}


  ngOnInit() {
    this.pesquisar();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  pesquisar(pagina = 0, limite = 5, nome = ''){
    this.filtro.page = pagina;
    this.filtro.limite = limite;
    this.filtro.nome = nome;
    this.service.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.dataSource.data = resultado.ordemServico;
      this.dados = resultado.total;
    });
  } 

  onPaginateChange(event) {
    const pagina = event.pageIndex;
    const limite = event.pageSize;
    this.pesquisar(pagina, limite);
  }

  deletar(id){
    this.modelService.openConfirmModal('Deseja Deletar o Produto?', (answer: boolean) =>{
      if(answer){
    this.service.deletar(id).subscribe(data=>{
      location.reload()
    });
      this.snackbar.barraError('Ordem de Serviço', 'Deletado com sucesso!');
    }
  });
  }

  comentarios(idOs){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = {idOs};
    this.dialog.open(OsModalComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }

    detalhes(id){
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = {id};
    this.dialog.open(OsModalDetalhesComponent, dialogConfig).afterClosed().subscribe(res => {
 
    });
    }
 


    filtrando(event){
      const pagina = this.paginator.pageIndex;
      const limite = this.paginator.pageSize;
      let nome = event;
      this.pesquisar(pagina, limite, nome);
    }
  

}
