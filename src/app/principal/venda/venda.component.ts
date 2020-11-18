import { BarraService } from './../../shared/barra-mensagem/barra.service';
import { Item } from './../../shared/model/item';
import { Produto } from './../../shared/model/produto';
import { Venda } from './../../shared/model/venda';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { VendaoService } from './vendao.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteBuscaModalComponent } from 'src/app/shared/buscas/cliente-busca-modal/cliente-busca-modal.component';
import { FuncionarioBuscaModalComponent } from 'src/app/shared/buscas/funcionario-busca-modal/funcionario-busca-modal.component';
import { Cliente } from 'src/app/shared/model/cliente';
import { Funcionario } from 'src/app/shared/model/funcionario';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  vendaFormulario: FormGroup;
  dataVenda = new Date();
  funcionarios: Funcionario = new Funcionario();
  clientes: Cliente = new Cliente();
  produtos: Produto = new Produto();
  vendas: Venda;
  produtoRecebe: any;

 constructor(private fb: FormBuilder,
  private vendaService: VendaoService,
  public dialog: MatDialog,
  private router: Router,
  private route: ActivatedRoute,
  private snackbar: BarraService){}

  ngOnInit(): void {
    this.carregarFormularioEmBranco();
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
    this.cliente.setValue(e);
  }

  mudaFuncionario(e){
    this.funcionario.setValue(e);
  }
  mudaStatus(e){
    this.statusVenda.setValue(e.target.value,{
      onlySelf: true
    });
  }


  deletar(){
    this.vendaService.deletarPorId(this.vendas.id).subscribe(data =>{
      this.vendas = null;
    });
  }

  adicionarProdutos(){
    this.vendaService.salvar(this.vendaFormulario.value).subscribe(dados =>{
      this.vendas = dados;
      this.snackbar.barraSucesso('Adicionar Itens','');
      this.router.navigate([`/venda/${this.vendas.id}/carrinho`], { relativeTo: this.route });
    });
  }



  setListaItens(itens: Item[]): FormArray{
    const formArray = new FormArray([]);
    itens.forEach(com =>{
       formArray.push(this.fb.group({
         produto: com.produto,
      quantidade: com.quantidade
       }));
    });
    return formArray;
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
 
}
