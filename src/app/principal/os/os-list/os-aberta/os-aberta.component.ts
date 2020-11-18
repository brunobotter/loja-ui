import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BarraService } from 'src/app/shared/barra-mensagem/barra.service';
import { DialogService } from 'src/app/shared/dialog-modal/dialog.service';
import { Os } from 'src/app/shared/model/os';
import { OsModalDetalhesComponent } from '../../os-modal-detalhes/os-modal-detalhes.component';
import { OsModalComponent } from '../../os-modal/os-modal.component';
import { OSFiltro, OsService } from '../../os.service';
import { OsListDataSource } from '../os-list-datasource';

@Component({
  selector: 'app-os-aberta',
  templateUrl: './os-aberta.component.html',
  styleUrls: ['./os-aberta.component.css']
})
export class OsAbertaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Os>;
  ELEMENT_DATA : Os[] = [];
  dataSource = new OsListDataSource(this.ELEMENT_DATA);
  dados: any;
  filtro = new OSFiltro();
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
      this.dados = this.dataSource.data.filter((dados: Os) => dados.status === 'ABERTA' || dados.status === 'ORÇAMENTO');
      this.dataSource.data = this.dados;
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
