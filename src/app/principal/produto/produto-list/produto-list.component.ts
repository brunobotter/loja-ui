import { ProdutoListDataSource } from './produto-list-datasource';
import { DialogService } from './../../../shared/dialog-modal/dialog.service';
import { ProdutoModalAtualizarComponent } from './../produto-modal-atualizar/produto-modal-atualizar.component';
import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { ProdutoFiltro, ProdutoService } from './../produto.service';
import { Produto } from './../../../shared/model/produto';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Produto>;


  ELEMENT_DATA : Produto[] = [];
  displayedColumns = ['id', 'nome', 'preco',  'atualizar', 'deletar'];
  dataSource = new ProdutoListDataSource(this.ELEMENT_DATA);
  filtro = new ProdutoFiltro();
  dados: any;


  constructor(private service: ProdutoService,
    private snackbar: BarraService,
    public dialog: MatDialog,
    private modelService: DialogService ){} 

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
      this.dataSource.data = resultado.produto;
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
        this.service.deleteContato(id).subscribe(data=>{
          location.reload()
        });
        this.snackbar.barraError('Produto', 'Deletado com sucesso!');
      }
    });
   
  }
  
  atualizar(id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "25%";
    dialogConfig.data = {id};
    this.dialog.open(ProdutoModalAtualizarComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }
  
}
