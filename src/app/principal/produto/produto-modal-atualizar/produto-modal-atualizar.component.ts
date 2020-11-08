import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { ProdutoService } from './../produto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-modal-atualizar',
  templateUrl: './produto-modal-atualizar.component.html',
  styleUrls: ['./produto-modal-atualizar.component.css']
})
export class ProdutoModalAtualizarComponent implements OnInit {
public produto: FormGroup;
public produtoData: any;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ProdutoModalAtualizarComponent>,
  private produtoService: ProdutoService,
  private snackbar:BarraService) { }

  ngOnInit(): void {
    this.carregarFormularioProdutoEmBranco();
    this.pegarProduto();
  }


  carregarFormularioProdutoEmBranco(){
    this.produto = this.fb.group({
      id: [null],
      nome: [null ,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      preco: [null , Validators.required]
    });
  }



  pegarProduto(){
    this.produtoService.listaPorId(this.data.id).subscribe(prod =>{
      this.produtoData = prod;
      this.carregarFormularioProduto();
    });
  }

  carregarFormularioProduto(){
    this.produto = this.fb.group({
      id: [this.produtoData.id],
      nome: [this.produtoData.nome ,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      preco: [this.produtoData.preco , Validators.required]
    });
  }

  atualizar(){
    this.produtoService.editarContato(this.data.id, this.produto.value).subscribe(dados =>{
      this.fecharModal();
    });
    this.snackbar.barraSucesso('Produto', 'Atualizado com Sucesso!');
  }

  fecharModal(){
    this.dialogRef.close();
    location.reload();
  }
} 
