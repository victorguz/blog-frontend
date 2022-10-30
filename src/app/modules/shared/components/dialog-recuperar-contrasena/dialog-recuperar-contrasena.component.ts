import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../../core/auth/auth.service';
import { CodigosRespuesa } from '../../../../core/constants.config';
import { Component } from '@angular/core';
import { MENSAJES } from './../../../../core/constants.config';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificacionesService } from '../../../../core/services/notificaciones.service';

@Component({
  selector: 'app-dialog-recuperar-contrasena',
  templateUrl: './dialog-recuperar-contrasena.component.html',
  styleUrls: ['./dialog-recuperar-contrasena.component.scss'],
})
export class DialogRecuperarContrasenaComponent {
  public isSubmited = false;
  public form: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private dialogRef: MatDialogRef<DialogRecuperarContrasenaComponent>,
    private notificaciones: NotificacionesService,
    private auth: AuthService
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }

  colorTextByError(text: string) {
    if (this.isSubmited && this.form.get(text)?.errors) {
      return '#f5365c';
    }
    return '#252525';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.isSubmited = true;
    } else {
      this.isSubmited = false;
      // this.usuariosService
      //   .recuperarContrasena(this.form.get('user')?.value)
      //   .subscribe({
      //     next: (result) => {
      //       if (result && result.status == CodigosRespuesa.Ok) {
      //         this.auth.cerrarSesion();
      //         this.notificaciones.notificarExito(
      //           MENSAJES.RESTAURAR_CONTRASENA.message,
      //           MENSAJES.RESTAURAR_CONTRASENA.title
      //         );
      //         this.onOk();
      //       }
      //     },
      //     error: (error) => {
      //       if (error) {
      //         if (error.status == CodigosRespuesa.NotFound) {
      //           this.notificaciones.notificarError(
      //             MENSAJES.USUARIO_INEXISTENTE
      //           );
      //         } else {
      //           this.notificaciones.notificarError(error.message);
      //         }
      //       } else {
      //         this.notificaciones.notificarError(
      //           error && error.message ? error.message : ''
      //         );
      //       }
      //     },
      //   });
    }
  }
}
