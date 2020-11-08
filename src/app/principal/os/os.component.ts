import { ClienteBuscaModalComponent } from './../../shared/buscas/cliente-busca-modal/cliente-busca-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BarraService } from './../../shared/barra-mensagem/barra.service';
import { FuncionarioService } from './../funcionario/funcionario.service';
import { ClienteService } from './../cliente/cliente.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OsService } from './os.service';
import { Component, OnInit } from '@angular/core';
import { Os } from 'src/app/shared/model/os';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit {

  constructor(private service: OsService,
    private serviceCliente: ClienteService,
    private serviceFuncionario: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: BarraService,
    private http: HttpClient,
    public dialog: MatDialog) { }

  os: FormGroup;
  data: any;
  clientes: Array<any>;
  ordem = new Os();
  funcionarios: Array<any>;
  dataInicial = new Date();

  ngOnInit(): void {

    this.carregarFormulario();
    this.data = this.route.snapshot.data['clientes'];
  //lista todos
    this.serviceFuncionario.listaTodos().subscribe(data =>{
      this.funcionarios = data;
    });
  
  }

  pesquisa(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "25%";
    this.dialog.open(ClienteBuscaModalComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }


  carregarFormulario(){
    this.os = this.fb.group({
      id: [null],
      dataEntrada: [this.dataInicial],
      dataSaida: [null],
      preco: [0.0, Validators.required],
      cliente: [null],
      funcionario: [null],
      status: [null],
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
      console.log(this.os.value);
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

mudaStatus(e){
  this.status.setValue(e.target.value,{
    onlySelf: true
  });
}

    mudaCliente(e){
      this.cliente.setValue(e.target.value, {
        onlySelf: true
      });
    }

    mudaFuncionario(e){
      this.funcionario.setValue(e.target.value, {
        onlySelf: true
      });
    }


} 
