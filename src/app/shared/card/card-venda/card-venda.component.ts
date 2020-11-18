import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns'
import { VendaoService } from 'src/app/principal/venda/vendao.service';
import { Venda } from '../../model/venda';
@Component({
  selector: 'app-card-venda',
  templateUrl: './card-venda.component.html',
  styleUrls: ['./card-venda.component.css']
})
export class CardVendaComponent implements OnInit {
  @Input() title: string;
  verificaDia: boolean = false;
  verificaTotal: boolean = false;
  datas: any;
  data = new Date();
  vendaDia: Venda[];
  vendasTotal: Venda[];
  dados: any;
  constructor(private vendaService: VendaoService) { }

  ngOnInit(): void {
   this.vendasDoDia();
   this.vendaTotal();
  }


  vendasDoDia(){
    this.datas = format(new Date(this.data), 'yyyy-M-dd');

    this.vendaService.listaTodos()
    .subscribe(resultado =>{ 
      this.vendaDia = resultado._embedded.vendas;
      this.dados = this.vendaDia.filter((dados: Venda) => dados.dataVenda === this.datas);
      this.vendaDia = this.dados;
      this.verificaDia = true;
    },error => console.log(error));
  }

  vendaTotal(){
    this.vendaService.listaTodos()
    .subscribe(data =>{
      this.vendasTotal = data._embedded.vendas;
      this.verificaTotal = true;
    })
  }
}
