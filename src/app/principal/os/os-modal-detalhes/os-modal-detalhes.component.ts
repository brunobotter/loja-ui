import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { ClienteService } from './../../cliente/cliente.service';
import { Descricao } from './../../../shared/model/descricao';
import { Os } from 'src/app/shared/model/os';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { OsService } from './../os.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-os-modal-detalhes',
  templateUrl: './os-modal-detalhes.component.html',
  styleUrls: ['./os-modal-detalhes.component.css']
})
export class OsModalDetalhesComponent implements OnInit {
  os: FormGroup;
  doc: any;
  ordemServico = new Os();
  ordem: any;
  finalizada: boolean = false;
   cliente:any = 'null';
   funcionario: any = 'null';
   verifica: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<OsModalDetalhesComponent>,
  private service: OsService,
  private fb: FormBuilder,
  private snackBar: BarraService
  ) { }
  

  ngOnInit(): void {
    this.carregarEmBranco();
   this.pegarOs();
  }

  carregarFormulario(){
    this.os = this.fb.group({
    id: [this.data.id],
    dataEntrada: [this.ordem.dataEntrada],
    dataSaida: [this.ordem.dataSaida],
    preco: [this.ordem.preco],
    cliente: [this.ordem.cliente],
    funcionario: [this.ordem.funcionario],
    status: [this.ordem.status],
    comentarios: this.fb.array([this.criarFormComentario()]),
    });
    this.cliente = this.ordem.cliente;
    this.funcionario = this.ordem.funcionario;
    this.os.setControl('comentarios', this.setComentarioExistente(this.ordem.comentarios));
    if(this.ordem.status != 'FINALIZADA'){
    this.finalizada = true;
  }
  this.verifica = true;
  }

public get descricoes():FormArray{
  return this.os.get('comentarios') as FormArray;
}

deletar(indexComentario: number): void{
  this.service.deletaComentario(this.os.value.comentarios[indexComentario].id).subscribe(data =>{
    
  });
  (<FormArray>this.os.get('comentarios')).removeAt(indexComentario);
}



  criarFormComentario(): FormGroup{
  return this.fb.group({
  comentario: [''],
  dataEnvio: ['']
  });
  }

pegarOs(){
  this.service.buscaPorId(this.data.id).subscribe(datas =>{
    this.ordem = datas;
    this.carregarFormulario();
  });
}


setComentarioExistente(comentario: Descricao[]): FormArray{
  const formArray = new FormArray([]);
  comentario.forEach(com =>{
    console.log(com)
     formArray.push(this.fb.group({
      id: [com.id],
      comentario: [com.comentario],
      dataEnvio: [com.dataEnvio],
      os: [this.data.id]
     }));
  });
  return formArray;
}

  cancel(){
    this.dialogRef.close();
    location.reload();
  } 

  
  carregarEmBranco(){
    this.os = this.fb.group({
      id: [null],
      dataEntrada: [null],
      dataSaida: [null],
      preco: [null],
      cliente: [null],
      funcionario: [null],
      status: [null]
      });
  }

  sair(){
    this.dialogRef.close();
  }


  finalizar(){
    this.service.finalizarOs(this.os.value.id).subscribe(data =>{
      this.cancel();
      this.snackBar.barraSucesso('Ordem de Serviço', 'Finalizada com Sucesso!');
    });
   
    
  
  }

  salvar(){
    this.service.atualizar(this.os.value.id ,this.os.value).subscribe(data =>{
     this.cancel();
      console.log(data)
      this.snackBar.barraSucesso('Ordem de Serviço', 'Atualizada com Sucesso!');
    });
  
 
  }
}
