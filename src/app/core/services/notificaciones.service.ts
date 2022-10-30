import {
  ModalOptions,
  SpinnerMessageOptions,
} from '../interfaces/shared.interfaces';
import { Observable, Subject } from 'rxjs';

import { ComponentType } from '@angular/cdk/portal';
import { DialogComponent } from '../../modules/shared/components/dialog/dialog.component';
import { Injectable } from '@angular/core';
import { MENSAJES } from '../constants.config';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../../modules/shared/components/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  constructor(protected dialog: MatDialog) {}

  /**
   * @description muestra un modal dependiendo el tipo seleccionado
   */
  public modalComponent(body: {
    component: ComponentType<any>;
    options?: any;
    width?: string;
    height?: string;
  }) {
    let subject = new Subject<any>();

    const dialogRef = this.dialog.open(body.component, {
      data: body.options,
      width: body.width || 'fit-content',
      height: body.height || 'fit-content',
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * @description muestra un modal dependiendo el tipo seleccionado
   */
  private modal(
    options: ModalOptions,
    type: 'confirmation' | 'info'
  ): Observable<boolean> {
    return this.modalComponent({
      component: DialogComponent,
      options: { options, type },
    });
  }

  /**
   * @description muestra un modal de confirmación
   */
  modalConfirmacion(options: ModalOptions) {
    return this.modal(options, 'confirmation');
  }

  /**
   * @description Muesra un modal informativo
   */
  modalInformacion(options: ModalOptions) {
    return this.modal(options, 'info');
  }

  /**
   * @description muestra un modal de tipo spinner
   */
  notificacion(options: SpinnerMessageOptions) {
    let subject = new Subject<boolean>();

    const dialogRef = this.dialog.open(SpinnerComponent, {
      data: { options },
      width: '400px',
      autoFocus: false,
      hasBackdrop: false,
      closeOnNavigation: false,
      disableClose: true,
      position: {
        top: '1rem',
        right: '1rem',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
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
  notificarExito(message?: string, title?: string) {
    return this.notificacion({
      title: title || MENSAJES.EXITO_GENERAL.title,
      message: message || MENSAJES.EXITO_GENERAL.message,
      color: 'primary',
      icon: 'check_circle',
      timeoutMillis: 5000,
    });
  }

  /**
   * notificacion de error
   * @param message
   * @param title
   * @returns
   */
  notificarError(message?: string, title?: string) {
    return this.notificacion({
      title: title || MENSAJES.ERROR_GENERAL.title,
      message: message || MENSAJES.ERROR_GENERAL.message,
      color: 'danger',
      icon: 'cancel',
      timeoutMillis: 5000,
    });
  }
}
