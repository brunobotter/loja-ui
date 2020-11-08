import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-modal-detalhes',
  templateUrl: './cliente-modal-detalhes.component.html',
  styleUrls: ['./cliente-modal-detalhes.component.css']
})
export class ClienteModalDetalhesComponent implements OnInit {

  cliente: FormGroup;
  clienteData: any;

  constructor(private clienteService: ClienteService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<ClienteModalDetalhesComponent>) { }

  ngOnInit(): void {
    this.carregarClientesEmBranco();
    this.consultarCliente();
  }

  carregarClientesEmBranco(){
    this.cliente = this.fb.group({
      nome: [null,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      telefone: [null, Validators.required],
      email: [null,  Validators.compose([ Validators.required, Validators.email])],
      logradouro: [null, Validators.required],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      cpf: [null, Validators.required],
      login: [null,Validators.required],
      senha: [null,Validators.required]
    });
  }

  carregarClientes(){
    this.cliente = this.fb.group({
      nome: [this.clienteData.nome,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      telefone: [this.clienteData.telefone, Validators.required],
      email: [this.clienteData.email,  Validators.compose([ Validators.required, Validators.email])],
      logradouro: [this.clienteData.logradouro, Validators.required],
      cep: [this.clienteData.cep, Validators.required],
      cidade: [this.clienteData.cidade, Validators.required],
      estado: [this.clienteData.estado, Validators.required],
      numero: [this.clienteData.numero, Validators.required],
      complemento: [this.clienteData.complemento],
      cpf: [this.clienteData.cpf, Validators.required],
      login: [this.clienteData.login,Validators.required],
      senha: [this.clienteData.senha,Validators.required]
    });
  }

  consultarCliente(){
    this.clienteService.listaPorId(this.data.idCliente).subscribe(dados =>{
      this.clienteData = dados; 
      this.carregarClientes();
    });
  }

}
 