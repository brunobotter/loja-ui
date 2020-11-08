import { BarraService } from './../../shared/barra-mensagem/barra.service';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from 'src/app/shared/consulta-cep/consulta-cep.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(  private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClienteService,
    private snacBar: BarraService,
    private cepService: ConsultaCepService) { }

    cliente: FormGroup;
  ngOnInit(): void {
    this.carregarFormulario();
  }

  carregarFormulario(){
    this.cliente = this.fb.group({
    nome: [null,  Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
    telefone: [null, Validators.required],
    email: [null,  Validators.compose([ Validators.required, Validators.email])],
    cpf: [null, Validators.required],
        logradouro: [null, Validators.required],
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        complemento: [null],
    });
  }
  

 

  adicionar(){
    this.service.salvar(this.cliente.value).subscribe(dados =>{
      this.router.navigate(['']);
      this.snacBar.barraSucesso('salvo com sucesso!', 'SnackBar');
    });
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
