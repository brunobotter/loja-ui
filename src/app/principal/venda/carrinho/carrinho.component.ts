import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { delay, switchMap } from 'rxjs/operators';
import { Venda } from './../../../shared/model/venda';
import { Item } from './../../../shared/model/item';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaoService } from './../vendao.service';
import { ProdutoService } from './../../produto/produto.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itemFormulario: FormGroup;
  produtos: Array<any>;
  vendas: Venda;
  itens: Item[];
  
  item: Item;
  produtoRecebe: any;
  vendaFormulario: FormGroup;
  teste: any;
data: any;
  constructor(private fb: FormBuilder,
    private vendaService: VendaoService,
    private produtoService: ProdutoService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: BarraService) { 
      this.route.params.subscribe(params =>{
        this.data = params['id'];
      })
    }

  ngOnInit(): void {
    this.pegarDadosVenda();
    this.carregarFormulario();
  }


  carregarFormulario(){
    this.itemFormulario = this.fb.group({
      produto: [null],
      venda: [this.data.id],
      quantidade: [null],
      listaItem: this.fb.array([])
    });
  }

  pegarDadosVenda(){
    this.vendaService.listaVendaPorId(this.data).subscribe(dados =>{
      this.data = dados;
      this.carregarFormulario();
      this.produtoService.listaTodos().subscribe(prod =>{
        this.produtos = prod;
      });
    });
  }

  get produto(){
    return this.itemFormulario.get('produto');
  }

  
  mudaproduto(e){
    this.produto.setValue(e.target.value,{
      onlySelf: true
    });
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
  


  carregarArrayItem(item){
    return this.fb.group({
      id: [],
      produto: [],
      venda: [],
      quantidade: [],
      valor: []
    })
  }

  
  get listaItens(): FormArray{
    return this.itemFormulario.get('listaItem') as FormArray;
  }


  finalizar(){
    this.router.navigate([`/venda/${this.data.id}/finalizar-venda`], { relativeTo: this.route });
  }
}
