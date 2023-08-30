import {
  ModalOptions,
  SpinnerMessageOptions,
} from '../interfaces/shared.interfaces';
import { Observable, Subject } from 'rxjs';

import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MENSAJES } from '../constants.config';
import {
  DialogPosition,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { DatePickerComponent } from '../../modules/shared/components/date-picker/date-picker.component';
import { DialogComponent } from '../../modules/shared/components/dialog/dialog.component';
import { SpinnerComponent } from '../../modules/shared/spinner/spinner.component';
import { ModalImagenComponent } from '../../modules/shared/components/modal-imagen/modal-imagen.component';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private dialogRef!: MatDialogRef<any, any>;
  private spinnerRef!: MatDialogRef<any, any>;

  constructor(protected dialog: MatDialog, private router: Router) {}

  /**
   * @description muestra un modal dependiendo el tipo seleccionado
   */
  public modalComponent(body: {
    component: ComponentType<any>;
    data?: any;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    updatePosition?: DialogPosition;
    panelClass?: string | string[];
    disableClose?: boolean;
  }) {
    if (this.dialogRef) this.dialogRef.close(undefined);
    let subject = new Subject<any>();

    this.dialogRef = this.dialog.open(body.component, {
      data: body.data,
      width: body.width || '550px',
      minWidth: body.minWidth || '28vw',
      maxWidth: body.maxWidth || body.width || '90vw',
      height: body.height || 'fit-content',
      minHeight: body.minHeight || 'fit-content',
      maxHeight: body.maxHeight || body.height || '90vh',
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: false,
      disableClose: body.disableClose != undefined ? body.disableClose : true,
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: body.panelClass || 'dialog-panel',
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * @description muestra un modal dependiendo el tipo seleccionado
   */
  private modal(
    options: ModalOptions,
    type: 'confirmation' | 'info',
    color: 'primary' | 'danger'
  ): Observable<boolean> {
    return this.modalComponent({
      component: DialogComponent,
      width: '550px',
      height: '350px',

      data: { options, type, color },
    });
  }

  /**
   * @description muestra un modal de confirmación
   */
  modalConfirmacion(options: ModalOptions) {
    return this.modal(options, 'confirmation', 'primary');
  }

  /**
   * @description muestra un modal de confirmación
   */
  modalConfirmacionError(options: ModalOptions) {
    return this.modal(options, 'confirmation', 'danger');
  }

  /**
   * @description Muesra un modal informativo
   */
  modalInformacion(options: ModalOptions) {
    return this.modal(options, 'info', 'primary');
  }

  /**
   * @description muestra un modal de tipo spinner
   */
  private notificacion(options: SpinnerMessageOptions) {
    if (this.spinnerRef) this.spinnerRef.close(undefined);
    let subject = new Subject<boolean>();

    this.spinnerRef = this.dialog.open(SpinnerComponent, {
      data: { options },
      panelClass: 'dialog-spinner',
      width: '400px',
      autoFocus: false,
      hasBackdrop: false,
      closeOnNavigation: false,
      disableClose: true,
      position: {
        top: '243px',
        right: '0',
      },
    });

    this.spinnerRef.afterClosed().subscribe((result: boolean) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * notificacion de exito
   * @param message
   * @param title
   * @returns
   */
  notificarExito(message?: string) {
    return this.notificacion({
      message: message || MENSAJES.EXITO_GENERAL.message,
      color: 'success',
      icon: 'check',
      timeoutMillis: 5000,
    });
  }

  /**
   * notificacion de error
   * @param message
   * @param title
   * @returns
   */
  notificarError(message?: string) {
    return this.notificacion({
      message: message || MENSAJES.ERROR_GENERAL.message,
      color: 'danger',
      icon: 'close',
      timeoutMillis: 5000,
    });
  }

  mostrarImagen(src: string) {
    this.modalComponent({
      component: ModalImagenComponent,
      width: '90vw',

      maxHeight: '90vh',
      data: src,
      panelClass: 'modal-imagen',
      disableClose: false,
    });
  }

  /**
   * @description muestra un modal para seleccionar fecha
   */
  public modalDatePicker(
    options: ModalOptions,
    includeHour: boolean = false,
    initialValue?: Date
  ): Observable<Date | null> {
    return this.modalComponent({
      component: DatePickerComponent,
      data: { options, type: 'confirmation', includeHour, initialValue },
      width: '350px',
    });
  }
}
