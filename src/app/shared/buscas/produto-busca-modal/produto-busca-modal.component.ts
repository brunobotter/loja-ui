import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProdutoFiltro, ProdutoService } from 'src/app/principal/produto/produto.service';

@Component({
  selector: 'app-produto-busca-modal',
  templateUrl: './produto-busca-modal.component.html',
  styleUrls: ['./produto-busca-modal.component.css']
})
export class ProdutoBuscaModalComponent implements OnInit {
  filtro = new ProdutoFiltro();
  data: any;
  constructor(private produtoService: ProdutoService,
    public dialogRef: MatDialogRef<ProdutoBuscaModalComponent>) { }

  ngOnInit(): void {
    this.produtoService.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.data = resultado.produto;
    });
  }


  pesquisar(nome = ''){
    this.filtro.nome = nome;
    this.produtoService.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.data = resultado.produto;
    });
  }  
  
  filtrando(event){
    const pagina = 0;
    const limite = 100;
    let nome = event;
    this.pesquisar(nome);
  }

  seleciona(id){
    this.produtoService.listaPorId(id).subscribe(data =>{
      this.cancel(data);
    })
  }

  cancel(data){
    this.dialogRef.close(data);
  } 

}
