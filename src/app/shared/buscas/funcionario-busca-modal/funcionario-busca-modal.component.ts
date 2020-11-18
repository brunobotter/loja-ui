import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FuncionarioService } from 'src/app/principal/funcionario/funcionario.service';
import { OSFiltro } from 'src/app/principal/os/os.service';

@Component({
  selector: 'app-funcionario-busca-modal',
  templateUrl: './funcionario-busca-modal.component.html',
  styleUrls: ['./funcionario-busca-modal.component.css']
})
export class FuncionarioBuscaModalComponent implements OnInit {
  filtro = new OSFiltro();
  data: any;
  constructor(private funcionarioService: FuncionarioService,
    public dialogRef: MatDialogRef<FuncionarioBuscaModalComponent>) { }

  ngOnInit(): void {
    this.funcionarioService.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.data = resultado.funcionario;
    });
  }


  pesquisar(nome = ''){
    this.filtro.nome = nome;
    this.funcionarioService.pesquisar(this.filtro)
    .subscribe(resultado =>{ 
      this.data = resultado.funcionario;
    });
  }  
  
  filtrando(event){
    const pagina = 0;
    const limite = 100;
    let nome = event;
    this.pesquisar(nome);
  }

  seleciona(id){
    this.funcionarioService.listaPorId(id).subscribe(data =>{
      this.cancel(data);
    })
  }

  cancel(data){
    this.dialogRef.close(data);
  } 
}

