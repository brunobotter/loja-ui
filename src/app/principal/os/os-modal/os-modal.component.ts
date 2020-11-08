import { BarraService } from './../../../shared/barra-mensagem/barra.service';
import { ActivatedRoute } from '@angular/router';
import { Descricao } from './../../../shared/model/descricao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OsService } from './../os.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-os-modal',
  templateUrl: './os-modal.component.html',
  styleUrls: ['./os-modal.component.css']
})
export class OsModalComponent implements OnInit {

descricao: FormGroup;
os: FormGroup;
datas = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OsModalComponent>,
    private service: OsService,
    private fb: FormBuilder,
    private snackbar: BarraService) { }


  
  ngOnInit(): void {
    this.pegarUsuario();
    this.carregarFormulario();
  }

  carregarFormulario(){
   
    this.descricao = this.fb.group({
      comentario: [null, Validators.required],
      dataEnvio: [this.datas],
      os: [this.data.idOs]
    });
  }


  calcel(){
    this.dialogRef.close();
  }

pegarUsuario(){
  this.service.buscaPorId(this.data.idOs).subscribe(datas =>{
    this.data.idOs = datas;
    console.log(this.data.idOs)
  });
}
  adicionarComentario(){
    this.service.adicionaComentario(this.descricao.value, this.data.idOs.id).subscribe(data =>{
      this.snackbar.barraSucesso('Comentario', 'Adicionada Com Sucesso!')
      this.cancel();
    });
  }

  cancel(){
    this.dialogRef.close();
  } 


}
