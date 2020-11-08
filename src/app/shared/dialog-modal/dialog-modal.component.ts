import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component,  Input, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})

export class DialogModalComponent {

  @Input() title:string; 
  @Input() msg:string;
  @Input() cancelTxt:'Cancelar';
  @Input() okTxt:'Sim';


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalConfirmData
  ) { }




}
  export class ModalConfirmData {
    title: string;
    content: string;
    confirmButtonLabel: string;
    closeButtonLabel: string;
  
    constructor(data?) {
      if (data) {
        this.title = data.title;
        this.content = data.content;
        this.confirmButtonLabel = data.confirmButtonLabel;
        this.closeButtonLabel = data.closeButtonLabel;
      }
    }
  
  }
