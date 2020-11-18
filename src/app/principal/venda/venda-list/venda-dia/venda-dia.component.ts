
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BarraService } from 'src/app/shared/barra-mensagem/barra.service';
import { DialogService } from 'src/app/shared/dialog-modal/dialog.service';
import { Venda } from 'src/app/shared/model/venda';
import { VendaAtualizarModalComponent } from '../../venda-atualizar-modal/venda-atualizar-modal.component';
import { VendaDetalhesModalComponent } from '../../venda-detalhes-modal/venda-detalhes-modal.component';
import { vendaFiltro, VendaoService } from '../../vendao.service';
import { VendaListDataSource } from '../venda-list-datasource';
import { format } from 'date-fns'
@Component({
  selector: 'app-venda-dia',
  templateUrl: './venda-dia.component.html',
  styleUrls: ['./venda-dia.component.css']
})
export class VendaDiaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Venda>;
  ELEMENT_DATA : Venda[] = [];
  dataSource = new VendaListDataSource(this.ELEMENT_DATA);
  filtro = new vendaFiltro();
  dados: any;
  data = new Date();
  novaVenda: Venda[];
  verifica:boolean = false;
  datas:any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'dataVenda', 'statusVenda', 'valorTotal', 'cliente', 'funcionario', 'detalhes',
  'atualizar', 'deletar'];

constructor(private service: VendaoService,
  private snackbar: BarraService,
  private modelService: DialogService,
  public dialog: MatDialog ){}

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
    this.datas = format(new Date(this.data), 'yyyy-M-dd');

    this.service.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.dataSource.data = resultado.venda;
      this.dados = resultado.total;
      this.novaVenda = this.dataSource.data.filter((dados: Venda) => dados.dataVenda === this.datas);
      this.dataSource.data = this.novaVenda;
    },error => console.log(error));
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
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = {idOs};
    this.dialog.open(VendaAtualizarModalComponent, dialogConfig).afterClosed().subscribe(res => {
    });
}

  detalhes(idOs){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.data = {idOs};
    this.dialog.open(VendaDetalhesModalComponent
    , dialogConfig).afterClosed().subscribe(res => {
    });

}

filtrando(event){
  const pagina = 0;
  const limite = 10;
  let nome = event;
  this.pesquisar(pagina, limite, nome);
}

}
