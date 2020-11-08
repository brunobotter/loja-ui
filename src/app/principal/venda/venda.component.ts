import { BarraService } from './../../shared/barra-mensagem/barra.service';
import { Item } from './../../shared/model/item';
import { Produto } from './../../shared/model/produto';
import { Venda } from './../../shared/model/venda';
import { ProdutoService } from './../produto/produto.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteService } from './../cliente/cliente.service';
import { FuncionarioService } from './../funcionario/funcionario.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { VendaoService } from './vendao.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  vendaFormulario: FormGroup;
  dataVenda = new Date();
  funcionarios: Array<any>;
  clientes: Array<any>;
  produtos: Array<any>;
  vendas: Venda;
  produtoRecebe: any;

 constructor(private fb: FormBuilder,
  private vendaService: VendaoService,
  private produtoService: ProdutoService,
  private serviceCliente: ClienteService,
  private serviceFuncionario: FuncionarioService,
  public dialog: MatDialog,
  private router: Router,
  private route: ActivatedRoute,
  private snackbar: BarraService){}

  ngOnInit(): void {
    this.carregarFormularioEmBranco();
   //lista todos
    this.serviceFuncionario.listaTodos().subscribe(data =>{
      this.funcionarios = data;
    });
    this.produtoService.listaTodos().subscribe(data =>{
      this.produtos = data;
    })
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
    this.cliente.setValue(e.target.value, {
      onlySelf: true
    });
  }

  mudaFuncionario(e){
    this.funcionario.setValue(e.target.value, {
      onlySelf: true
    });
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

 
}
