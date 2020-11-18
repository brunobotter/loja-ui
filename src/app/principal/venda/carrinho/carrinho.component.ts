import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import {  switchMap } from 'rxjs/operators';
import { Venda } from './../../../shared/model/venda';
import { Item } from './../../../shared/model/item';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaoService } from './../vendao.service';
import { ProdutoService } from './../../produto/produto.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Produto } from 'src/app/shared/model/produto';
import { ProdutoBuscaModalComponent } from 'src/app/shared/buscas/produto-busca-modal/produto-busca-modal.component';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itemFormulario: FormGroup;
  produtos: Produto = new Produto();
  vendas: Venda;
  itens: Item[];
  item: Item;
  produtoRecebe: any;
data: any;
  constructor(private fb: FormBuilder,
    private vendaService: VendaoService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: BarraService) { 
      this.route.params.subscribe(params =>{
        this.data = params['id'];
      })
    }

  ngOnInit(): void {
    this.carregaEmBranco();
    this.pegarDadosVenda();
    this.pegaLista();
  }

  carregaEmBranco(){
    this.itemFormulario = this.fb.group({
      produto: [null],
      venda: [this.data.id],
      quantidade: [null],
      listaItem: this.fb.array([])
    });
  }



  carregarFormulario(){
    this.itemFormulario = this.fb.group({
      produto: [null],
      venda: [this.data.id],
      quantidade: [null],
      listaItem: this.fb.array([this.carregarListaItem()])
    });
  }

  pegarDadosVenda(){
    this.vendaService.listaVendaPorId(this.data).subscribe(dados =>{
      this.data = dados;
      this.carregarFormulario();
     
    });
  }

  pegaLista(){
   this.vendaService.listaItemPorVenda(this.data).subscribe(dados => {    
    this.itens = dados;
    const itemFormArray = this.itemFormulario.get('listaItem') as FormArray;
    itemFormArray.clear();
    this.itens.forEach(s =>{
      itemFormArray.push(this.fb.group({  
        id: [s.id],
        produto: [s.produto.nome],
        quantidade: [s.quantidade],
        valor: [s.valor]
      }));
    });
    this.itemFormulario.patchValue(this.itens);
   });
   
  }
  
 
  

  get produto(){
    return this.itemFormulario.get('produto');
  }

  buscaProduto(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(ProdutoBuscaModalComponent, dialogConfig).afterClosed().subscribe(res => {
      this.mudaproduto(res)
      this.produtos = res;
    });
  }
  
  mudaproduto(e){
    this.produto.setValue(e);
  }


  adicionarItem(){
    this.produtoRecebe = this.itemFormulario.value.produto.id;
    this.vendaService.adicionaItem(this.itemFormulario.value,
      this.data.id, this.produtoRecebe).pipe(switchMap(data =>{
        this.itens = data;
        return this.vendaService.listaItemPorVenda(this.data.id)
        
      })).subscribe(dados =>{    
        this.itens = dados;
        const itemFormArray = this.itemFormulario.get('listaItem') as FormArray;
        itemFormArray.clear()
        this.itens.forEach(s =>{
          itemFormArray.push(this.fb.group({  
            id: [s.id],
            produto: [s.produto.nome],
            quantidade: [s.quantidade],
            valor: [s.valor]
          }));
        });
        this.itemFormulario.patchValue(this.itens);
        this.snackBar.barraSucesso('Item', 'Adicionado com Sucesso!');
      });   
  }


  deletar(index: number): void{
    this.vendaService.deletaItemPorId(this.itemFormulario.value.listaItem[index].id).subscribe(data =>{
      this.snackBar.barraError('Item', 'Deletado com Sucesso!');
    });
    (<FormArray>this.itemFormulario.get('listaItem')).removeAt(index);
  }
  


  
  get listaItens(): FormArray{
    return this.itemFormulario.get('listaItem') as FormArray;
  }


  carregarListaItem(){
    return this.fb.group({
      id: [''],
      produto: [''],
      quantidade: [''],
      valor: ['']
    })
  }

  finalizar(){
    this.router.navigate([`/venda/${this.data.id}/finalizar-venda`], { relativeTo: this.route });
  }
}
