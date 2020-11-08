import { AlertModalComponent } from './../../../../../http/src/app/shared/alert-modal/alert-modal.component';
import { DialogModalComponent, ModalConfirmData } from './dialog-modal.component';
import { AlertType, ModalAlertData } from './alerta-modal/alerta-modal.component';
import {  MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  getAlertTitle(alertType: AlertType) {
    switch (alertType) {
      case AlertType.INFO:
        return 'INFO';
      case AlertType.WARNING:
        return 'WARNING';
      case AlertType.ERROR:
        return 'ERROR';
    }
  }

  openAlertModal(message: string, alertType: AlertType) {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '300px',
      data: new ModalAlertData({
        title: this.getAlertTitle(alertType),
        content: message,
        closeButtonLabel: 'Close',
        alertType: alertType
      })
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('After Close Modal', result);
    });
  }

  openInfoModal(message: string) {
    this.openAlertModal(message, AlertType.INFO);
  }

  openWarningModal(message: string) {
    this.openAlertModal(message, AlertType.WARNING);
  }

  openErrorModal(message: string) {
    this.openAlertModal(message, AlertType.ERROR);
  }

  openConfirmModal(message: string, callBackFunction: Function) {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '300px',
      data: new ModalConfirmData({
        title: 'Exclusão',
        content: message,
        confirmButtonLabel: 'Confirm',
        closeButtonLabel: 'Close'
      })
    });

    dialogRef.afterClosed().subscribe(result => callBackFunction(result));
  }



}
