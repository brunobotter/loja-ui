import { Component, Input, OnInit } from '@angular/core';
import { OsService } from 'src/app/principal/os/os.service';
import { Os } from '../model/os';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  constructor(private ordemService: OsService) { }
  os: Os[];
  novaOrdemServico: Os[];
  verifica: boolean = false;
  listaTodos: any;
  listaAberta: any;
  listaFechada: any;
  verificaTodos: boolean = false;
  verificaFechado: boolean = false;
  verificaAberto: boolean = false;
  ngOnInit(): void {
    this.listarTodos();
    this.listarAberta();
    this.listarFechada();
  }

    listarTodos(){
      this.ordemService.listaTodos().subscribe(dados =>{
        this.listaTodos = dados._embedded.oses;
        this.verificaTodos = true;
      });
    }

    listarAberta(){
      this.ordemService.listaTodos().subscribe(dados =>{
        this.listaAberta = dados._embedded.oses;
        let novo = this.listaAberta.filter((dados: Os) => dados.status === 'ABERTA' || dados.status === 'ORÇAMENTO')
        this.listaAberta = novo;
        this.verificaAberto = true;
      });
    }

    listarFechada(){
      this.ordemService.listaTodos().subscribe(dados =>{
        this.listaFechada = dados._embedded.oses;
        let novo = this.listaFechada.filter((dados: Os) => dados.status === 'FINALIZADA' || dados.status === 'CANCELADA');
        this.listaFechada = novo;
        this.verificaFechado = true;
      });
    }
  


}
