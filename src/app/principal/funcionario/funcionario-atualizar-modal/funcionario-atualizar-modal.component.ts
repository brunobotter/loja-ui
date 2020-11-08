import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ConsultaCepService } from 'src/app/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-funcionario-atualizar-modal',
  templateUrl: './funcionario-atualizar-modal.component.html',
  styleUrls: ['./funcionario-atualizar-modal.component.css']
})
export class FuncionarioAtualizarModalComponent implements OnInit {
funcionario: FormGroup;
funcionarioData: any;
  constructor(private funcionarioService: FuncionarioService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<FuncionarioAtualizarModalComponent>,
  private snackBar: BarraService,
  private cepService: ConsultaCepService) { }
 

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
        bairro: [null, Validators.required],
        complemento: [null],
      cpf: [null, Validators.required]
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
        bairro: [this.funcionarioData.bairro, Validators.required],
        complemento: [this.funcionarioData.complemento],
      cpf: [this.funcionarioData.cpf, Validators.required]
    });
  }

  consultarFuncionario(){
    this.funcionarioService.listaPorId(this.data.idFuncionario).subscribe(dados =>{
      this.funcionarioData = dados;
      this.carregarFuncionarios();
    });
  }

  atualizar(){
    this.funcionarioService.atualizar(this.funcionarioData.id, this.funcionario.value).subscribe(data =>{
      this.fecharModal();      
    });
    this.snackBar.barraSucesso('Funcionario', 'Atualizado com Sucesso!');
  }

  fecharModal(){
    this.dialogRef.close();
    location.reload();
  }

  consultaCep(){
    let cep = this.funcionario.get('cep').value;
    console.log(cep)
    if(cep != null && cep !== ''){
      this.cepService.consultaCep(cep)
      .subscribe(dados => this.populaDadosCEP(dados));
 
    }
  }

  populaDadosCEP(dados){
    this.funcionario.patchValue({
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
    });
  }
}
