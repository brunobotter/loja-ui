import { DialogService } from './../../../shared/dialog-modal/dialog.service';
import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { vendaFiltro, VendaoService } from './../vendao.service';
import { Venda } from './../../../shared/model/venda';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { VendaListDataSource } from './venda-list-datasource';

@Component({
  selector: 'app-venda-list',
  templateUrl: './venda-list.component.html',
  styleUrls: ['./venda-list.component.css']
})
export class VendaListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Venda>;
  ELEMENT_DATA : Venda[] = [];
  dataSource = new VendaListDataSource(this.ELEMENT_DATA);
  filtro = new vendaFiltro();
  dados: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'dataVenda', 'statusVenda', 'valorTotal', 'cliente', 'funcionario', 'detalhes',
  'atualizar', 'deletar'];

constructor(private service: VendaoService,
  private snackbar: BarraService,
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
      this.dataSource.data = resultado.venda;
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
  this.service.deletarPorId(id).subscribe(data=>{
    location.reload()
  });
  this.snackbar.barraError('Venda','Deletada com Sucesso!');
}
});
}

atualizar(idOs){
 
}

  detalhes(id){
 

}

}
