import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ConsultaCepService } from 'src/app/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-cliente-modal-atualizar',
  templateUrl: './cliente-modal-atualizar.component.html',
  styleUrls: ['./cliente-modal-atualizar.component.css']
})
export class ClienteModalAtualizarComponent implements OnInit {
  cliente: FormGroup;
  clienteData: any;
    constructor(private clienteService: ClienteService,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ClienteModalAtualizarComponent>,
    private snackbar:BarraService,
    private cepService: ConsultaCepService) { }

  ngOnInit(): void {
    this.carregarFuncionariosEmBranco();
    this.consultarFuncionario();
  }

  carregarFuncionariosEmBranco(){
    this.cliente = this.fb.group({
      nome: [null,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      telefone: [null, Validators.required],
      email: [null,  Validators.compose([ Validators.required, Validators.email])],
          logradouro: [null, Validators.required],
          cep: [null, Validators.required],
          cidade: [null, Validators.required],
          estado: [null, Validators.required],
          numero: [null, Validators.required],
          bairro: [null, Validators.required],
          complemento: [null],
      cpf: [null, Validators.required],
    });
  }

  carregarFuncionarios(){
    this.cliente = this.fb.group({
      nome: [this.clienteData.nome,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      telefone: [this.clienteData.telefone, Validators.required],
      email: [this.clienteData.email,  Validators.compose([ Validators.required, Validators.email])],
      cpf: [this.clienteData.cpf, Validators.required],
        logradouro: [this.clienteData.logradouro, Validators.required],
        cep: [this.clienteData.cep, Validators.required],
        cidade: [this.clienteData.cidade, Validators.required],
        estado: [this.clienteData.estado, Validators.required],
        numero: [this.clienteData.numero, Validators.required],
        bairro: [this.clienteData.bairro, Validators.required],
        complemento: [this.clienteData.complemento],
    });
  }

  consultarFuncionario(){
    this.clienteService.listaPorId(this.data.idCliente).subscribe(dados =>{
      this.clienteData = dados;
      this.carregarFuncionarios();
    });
  }

  atualizar(){
    this.clienteService.editarContato(this.clienteData.id, this.cliente.value).subscribe(data =>{
      this.fecharModal();      
    });
    this.snackbar.barraSucesso('Cliente', 'Atualizado com Sucesso!');
  }

  fecharModal(){
    this.dialogRef.close();
    location.reload();
  }


  consultaCep(){
    let cep = this.cliente.get('cep').value;
    console.log(cep)
    if(cep != null && cep !== ''){
      this.cepService.consultaCep(cep)
      .subscribe(dados => this.populaDadosCEP(dados));
 
    }
  }

  populaDadosCEP(dados){
    this.cliente.patchValue({
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    });
  }
}
