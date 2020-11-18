import { FuncionarioService } from './funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from 'src/app/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: FuncionarioService,
    private cepService: ConsultaCepService) { }

    funcionario: FormGroup;
  ngOnInit(): void {
    this.carregarFuncionarios();
  } 

  carregarFuncionarios(){
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

  hasErrors(campo: string) {
    return this.funcionario.get(campo).errors;
  }
  adicionar(){
   this.service.salvar(this.funcionario.value).subscribe( dados =>{
     console.log(dados)
     this.router.navigate(['']);
   })
  }

  consultaCep(){
    let cep = this.funcionario.get('cep').value;
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
