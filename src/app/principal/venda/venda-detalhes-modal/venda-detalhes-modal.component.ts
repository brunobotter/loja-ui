import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BarraService } from 'src/app/shared/barra-mensagem/barra.service';
import { Cliente } from 'src/app/shared/model/cliente';
import { Funcionario } from 'src/app/shared/model/funcionario';
import { Item } from 'src/app/shared/model/item';
import { Produto } from 'src/app/shared/model/produto';
import { Venda } from 'src/app/shared/model/venda';
import { VendaoService } from '../vendao.service';

@Component({
  selector: 'app-venda-detalhes-modal',
  templateUrl: './venda-detalhes-modal.component.html',
  styleUrls: ['./venda-detalhes-modal.component.css']
})
export class VendaDetalhesModalComponent implements OnInit {
  vendaFormulario: FormGroup;
  dataVenda = new Date();
  funcionarios: Funcionario = new Funcionario();
  clientes: Cliente = new Cliente();
  produtos: Produto = new Produto();
  vendas: Venda = new Venda();
  vendaData:any;
  itens: Item[];
  constructor(private fb: FormBuilder,
    private vendaService: VendaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: BarraService,
    @Inject(MAT_DIALOG_DATA) public data)  { }

  ngOnInit(): void {
    this.carregarFormularioEmBranco();
    this.carregarVenda();
    this.pegaLista();
  }

  pegaLista(){
    this.vendaService.listaItemPorVenda(this.vendaData).subscribe(dados => {    
     this.itens = dados;
     const itemFormArray = this.vendaFormulario.get('listaItem') as FormArray;
     itemFormArray.clear();
     this.itens.forEach(s =>{
       itemFormArray.push(this.fb.group({  
         id: [s.id],
         produto: [s.produto.nome],
         quantidade: [s.quantidade],
         valor: [s.valor]
       }));
     });
     this.vendaFormulario.patchValue(this.itens);
    });
    
   }

carregarFormularioEmBranco(){
  this.vendaFormulario = this.fb.group({
    dataVenda: [this.dataVenda],
    cliente: [null, Validators.required],
    funcionario: [null, Validators.required],
    desconto: [0.0],
    valorTotal: [0.0],
    statusVenda: ['ABERTA', Validators.required],
    listaItem: this.fb.array([])
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
    cliente: [dados.cliente.nome, Validators.required],
    funcionario: [dados.funcionario.nome, Validators.required],
    desconto: [dados.desconto],
    valorTotal: [dados.valorTotal],
    statusVenda: [dados.statusVenda, Validators.required],
    listaItem: this.fb.array([])
  });
}


carregarFormularioListaItem(){
  this.vendaFormulario = this.fb.group({
    id: [null],
    produto: [null],
    quantidade: [null]
  })
}

get listaItens(): FormArray{
  return this.vendaFormulario.get('listaItem') as FormArray;
}

}
