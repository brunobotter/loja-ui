import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component,  Inject } from '@angular/core';

@Component({
  selector: 'app-alerta-modal',
  templateUrl: './alerta-modal.component.html',
  styleUrls: ['./alerta-modal.component.css']
})
export class AlertaModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ModalAlertData
  ) { }

  getAlertIcon() {
    switch (this.data.alertType) {
      case AlertType.INFO:
        return 'info';
      case AlertType.WARNING:
        return 'warning';
      case AlertType.ERROR:
        return 'error';
    }
  }
}

export class ModalAlertData {
  title: string;
  content: string;
  alertType: AlertType;
  closeButtonLabel: string;

  constructor(data?) {
    if (data) {
      this.title = data.title;
      this.content = data.content;
      this.alertType = data.alertType;
      this.closeButtonLabel = data.closeButtonLabel;
    }
  }
}

export enum AlertType {
  INFO, WARNING, ERROR
}
