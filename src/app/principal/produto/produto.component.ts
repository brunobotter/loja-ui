import { BarraService } from './../../shared/barra-mensagem/barra.service';
import { ProdutoService } from './produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProdutoService,
    private snacBar: BarraService
    ) { }

    produto: FormGroup;
  ngOnInit(): void {
    this.carregarFormulario();
  }

  carregarFormulario(){
    this.produto = this.fb.group({
    id: [null],
    nome: [null ,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
    preco: [null , Validators.required]
    })
  }

  adicionar(){
    this.service.salvar(this.produto.value).subscribe(dados => {
      dados = dados;
      this.router.navigate(['']);
      this.snacBar.barraSucesso('Produto', 'Salvo com sucesso!');
    })
  }

  limpar(){
    this.carregarFormulario();
  }



}
