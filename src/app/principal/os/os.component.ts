import { ClienteBuscaModalComponent } from './../../shared/buscas/cliente-busca-modal/cliente-busca-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BarraService } from './../../shared/barra-mensagem/barra.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OsService } from './os.service';
import { Component, OnInit } from '@angular/core';
import { Os } from 'src/app/shared/model/os';
import { FuncionarioBuscaModalComponent } from 'src/app/shared/buscas/funcionario-busca-modal/funcionario-busca-modal.component';
import { Cliente } from 'src/app/shared/model/cliente';
import { Funcionario } from 'src/app/shared/model/funcionario';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  constructor(private service: OsService,

    private router: Router,
    private fb: FormBuilder,
    private snackBar: BarraService,
    public dialog: MatDialog) { }

  os: FormGroup;
  data: any;
  clientes: Cliente = new Cliente();
  ordem = new Os();
  funcionarios: Funcionario = new Funcionario();
  dataInicial = new Date();
  nomeCliente: any;

  ngOnInit(): void {
    this.carregarFormulario();
  }

  carregarFormulario(){
    this.os = this.fb.group({
      id: [null],
      dataEntrada: [this.dataInicial],
      dataSaida: [null],
      preco: [0.0, Validators.required],
      cliente: [null],
      funcionario: [null],
      status: ['ABERTA'],
      descricao: this.fb.array([]),
    });
  }

  criarformComentario(): FormGroup{
    return this.fb.group({
      comentario: [null],
      dataEnvio: [this.dataInicial]
    }); 
  }

    public get comentario(): FormArray{
      return this.os.get('descricao') as FormArray;
    }
    

    salvar(){
      this.service.adiciona(this.os.value).subscribe(data =>{
        this.snackBar.barraSucesso('Ordem de Serviço','Aberta com Sucesso!');
        this.router.navigate(['']);
      })
    }

get cliente(){
  return this.os.get('cliente');
}

get funcionario(){
  return this.os.get('funcionario');
}

get status(){
  return this.os.get('status');
}

buscaCliente(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(ClienteBuscaModalComponent, dialogConfig).afterClosed().subscribe(res => {
      this.mudaCliente(res)
      this.clientes = res;
    });
} 


buscaFuncionario(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(FuncionarioBuscaModalComponent, dialogConfig).afterClosed().subscribe(res => {
      this.mudaFuncionario(res)
      this.funcionarios = res;
    });
} 

mudaStatus(e){
  this.status.setValue(e.target.value,{
    onlySelf: true
  });
}

    mudaCliente(e){
      this.cliente.setValue(e);
    }

    mudaFuncionario(e){
      this.funcionario.setValue(e);
    }


} 
