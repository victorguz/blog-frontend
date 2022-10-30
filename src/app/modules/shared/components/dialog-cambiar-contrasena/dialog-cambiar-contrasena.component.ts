import { UsuarioAuth } from './../../../../core/auth/auth.interfaces';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionesService } from '../../../../core/services/notificaciones.service';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-dialog-cambiar-contrasena',
  templateUrl: './dialog-cambiar-contrasena.component.html',
  styleUrls: ['./dialog-cambiar-contrasena.component.scss'],
})
export class DialogCambiarContrasenaComponent {
  public isSubmited = false;
  public form: FormGroup = new FormGroup({
    contrasena: new FormControl('', [Validators.required]),
    repetirContrasena: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<DialogCambiarContrasenaComponent>,
    private auth: AuthService,
    private notificaciones: NotificacionesService,
    @Inject(MAT_DIALOG_DATA)
    public user: UsuarioAuth
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
    if (
      this.form.invalid ||
      this.form.get('contrasena')?.value !==
        this.form.get('repetirContrasena')?.value
    ) {
      this.isSubmited = true;
    } else {
      this.isSubmited = false;
      // this.usuariosService
      //   .cambiarContrasena(this.user.id, this.form.get('contrasena')?.value)
      //   .subscribe({
      //     next: (result) => {
      //       if (result && result.status == CodigosRespuesa.Ok) {
      //         this.auth.cerrarSesion();
      //         this.notificaciones.notificarExito(
      //           'La próxima vez que inicies sesión deberá ser con tu nueva contraseña.',
      //           'Contraseña cambiada'
      //         );
      //         this.onOk();
      //       }
      //     },
      //     error: (error) => {
      //       this.notificaciones.notificarError(
      //         error && error.message ? error.message : ''
      //       );
      //     },
      //   });
    }
  }
}
