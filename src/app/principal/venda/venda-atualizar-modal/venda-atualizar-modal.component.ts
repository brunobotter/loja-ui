import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BarraService } from 'src/app/shared/barra-mensagem/barra.service';
import { ClienteBuscaModalComponent } from 'src/app/shared/buscas/cliente-busca-modal/cliente-busca-modal.component';
import { FuncionarioBuscaModalComponent } from 'src/app/shared/buscas/funcionario-busca-modal/funcionario-busca-modal.component';
import { DialogService } from 'src/app/shared/dialog-modal/dialog.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { Funcionario } from 'src/app/shared/model/funcionario';
import { Produto } from 'src/app/shared/model/produto';
import { Venda } from 'src/app/shared/model/venda';
import { VendaoService } from '../vendao.service';

@Component({
  selector: 'app-venda-atualizar-modal',
  templateUrl: './venda-atualizar-modal.component.html',
  styleUrls: ['./venda-atualizar-modal.component.css']
})
export class VendaAtualizarModalComponent implements OnInit {
  vendaFormulario: FormGroup;
  dataVenda = new Date();
  funcionarios: Funcionario = new Funcionario();
  clientes: Cliente = new Cliente();
  produtos: Produto = new Produto();
  vendas: Venda = new Venda();
  vendaData:any;
  verdadeiro = false;
  validarStatusVenda = false;
  statusVendaOption =[
    {key: 'ABERTA'},
    {key: 'FINALIZADA'}
  ]

  constructor(private fb: FormBuilder,
    private vendaService: VendaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: BarraService,
    @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit(): void {
    this.carregarFormularioEmBranco();
    this.carregarVenda();
  }

carregarFormularioEmBranco(){
  this.vendaFormulario = this.fb.group({
    dataVenda: [this.dataVenda],
    cliente: [null, Validators.required],
    funcionario: [null, Validators.required],
    desconto: [0.0],
    valorTotal: [0.0],
    statusVenda: ['ABERTA', Validators.required],
    listaItem: this.fb.array([this.carregarFormularioListaItem()])
  });
}

carregarVenda(){
  this.vendaData = this.data.idOs;
  this.vendaService.listaVendaPorId(this.vendaData).subscribe(dados =>{
    this.vendas = dados;
    this.carregarFormularioVenda(this.vendas)
  });
}

carregarFormularioVenda(dados){
  this.vendaFormulario = this.fb.group({
    dataVenda: [dados.dataVenda],
    cliente: [dados.cliente, Validators.required],
    funcionario: [dados.funcionario, Validators.required],
    desconto: [dados.desconto],
    valorTotal: [dados.valorTotal],
    statusVenda: [dados.statusVenda, Validators.required],
    listaItem: this.fb.array([this.carregarFormularioListaItem()])
  });
  this.verdadeiro = true;
}


carregarFormularioListaItem(){
  this.vendaFormulario = this.fb.group({
    id: [null],
    produto: [null],
    quantidade: [null]
  })
}

get cliente(){
  return this.vendaFormulario.get('cliente');
}

get funcionario(){
  return this.vendaFormulario.get('funcionario');
}
get statusVenda(){
  return this.vendaFormulario.get('statusVenda');
}




mudaCliente(e){
  this.vendas.cliente = e
  this.cliente.setValue(e);
}

mudaFuncionario(e){
  this.vendas.funcionario = e
  this.funcionario.setValue(e);
}
mudaStatus(e){
  this.statusVenda.setValue(e.target.value,{
    onlySelf: true
  });
  
}

buscaCliente(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(ClienteBuscaModalComponent, dialogConfig).afterClosed().subscribe(res => {
      this.mudaCliente(res)
      this.clientes = res;
    });
} 


buscaFuncionario(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(FuncionarioBuscaModalComponent, dialogConfig).afterClosed().subscribe(res => {
      this.mudaFuncionario(res)
      this.funcionarios = res;
    });
} 



  atualizarProduto(){
    this.vendaService.atualizar(this.vendaData, this.vendaFormulario.value).subscribe(data => {
      this.snackbar.barraSucesso('Adicionar Itens','');
      this.router.navigate([`/venda/${this.vendaData}/carrinho`], { relativeTo: this.route });
      this.dialog.closeAll();
    });
  }


}
