import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuncionarioService } from './../funcionario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
 
@Component({
  selector: 'app-funcionario-detalhes-modal',
  templateUrl: './funcionario-detalhes-modal.component.html',
  styleUrls: ['./funcionario-detalhes-modal.component.css']
})
export class FuncionarioDetalhesModalComponent implements OnInit {
  funcionario: FormGroup;
  funcionarioData: any;

  constructor(private funcionarioService: FuncionarioService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<FuncionarioDetalhesModalComponent>
  ) { }

  ngOnInit(): void {
    this.carregarFuncionariosEmBranco();
    this.consultarFuncionario();
  }

  carregarFuncionariosEmBranco(){
    this.funcionario = this.fb.group({
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

  carregarFuncionarios(){
    this.funcionario = this.fb.group({
      nome: [this.funcionarioData.nome,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      telefone: [this.funcionarioData.telefone, Validators.required],
      email: [this.funcionarioData.email,  Validators.compose([ Validators.required, Validators.email])],
      logradouro: [this.funcionarioData.logradouro, Validators.required],
      cep: [this.funcionarioData.cep, Validators.required],
      cidade: [this.funcionarioData.cidade, Validators.required],
      estado: [this.funcionarioData.estado, Validators.required],
      numero: [this.funcionarioData.numero, Validators.required],
      complemento: [this.funcionarioData.complemento],
      cpf: [this.funcionarioData.cpf, Validators.required],
      login: [this.funcionarioData.login,Validators.required],
      senha: [this.funcionarioData.senha,Validators.required]
    });
  }

  consultarFuncionario(){
    this.funcionarioService.listaPorId(this.data.idFuncionario).subscribe(dados =>{
      this.funcionarioData = dados;
      this.carregarFuncionarios();
    });
  }

}
