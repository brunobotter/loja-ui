import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { Venda } from './../../../shared/model/venda';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VendaoService } from './../vendao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizar-venda',
  templateUrl: './finalizar-venda.component.html',
  styleUrls: ['./finalizar-venda.component.css']
})
export class FinalizarVendaComponent implements OnInit {

  vendaFormulario: FormGroup;
  data:any;
  venda: Venda;
  valor: any;

 constructor(private fb: FormBuilder,
  private vendaService: VendaoService,
  private route: ActivatedRoute,
  private router: Router,
  private snackBar: BarraService
  ){ this.route.params.subscribe(params =>{
    this.data = params['id'];
  })
}

  ngOnInit(): void {
    this.carregarFormularioEmBranco();
    this.vendaService.listaVendaPorId(this.data).subscribe(data =>{
      this.venda = data;
      this.vendaService.calculaVendas(this.data).subscribe(dados =>{
        this.valor = dados.valorTotal;
        console.log(this.valor);
        this.carregarFormulario();
      })
      
    });
  }

carregarFormularioEmBranco(){
  this.vendaFormulario = this.fb.group({
    dataVenda: [],
    cliente: [],
    funcionario: [],
    desconto: [],
    valorTotal: [],
    statusVenda: [],
  });
}

  carregarFormulario(){
    this.vendaFormulario = this.fb.group({
      dataVenda: [this.venda.dataVenda],
      cliente: [this.venda.cliente.nome],
      funcionario: [this.venda.funcionario.nome],
      desconto: [this.venda.desconto],
      valorTotal: [this.valor],
      statusVenda: [this.venda.statusVenda],
    });
  }


  get statusVenda(){
    return this.vendaFormulario.get('statusVenda');
  }



  mudaStatus(e){
    this.statusVenda.setValue(e.target.value,{
      onlySelf: true
    });
  }

  finalizar(){
    this.vendaService.finalizarVenda(this.data, this.venda.desconto).subscribe(dados =>{
      this.snackBar.barraSucesso('Venda', 'Adicionado com Sucesso!');
    });
    this.router.navigate(['']);
  }
}
