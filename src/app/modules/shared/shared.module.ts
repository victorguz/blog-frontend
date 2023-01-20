import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuroraTableComponent } from './components/table/table.component';
import { AuthInterceptor } from '../../core/auth/auth.interceptor';
import { AuthService } from '../../core/auth/auth.service';
import { CirculoEstadoAsignacionComponent } from './components/circulo-estado-asignacion/circulo-estado-asignacion.component';
import { DialogCambiarContrasenaComponent } from './components/dialog-cambiar-contrasena/dialog-cambiar-contrasena.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogRecuperarContrasenaComponent } from './components/dialog-recuperar-contrasena/dialog-recuperar-contrasena.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { IndexedDBService } from './../../core/services/indexed-db.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { NotificacionesService } from '../../core/services/notificaciones.service';
import { PhrasecasePipe } from '../../core/pipes/phrasecase.pipe';
import { RouterModule } from '@angular/router';
import { SanitizePipe } from '../../core/pipes/sanitize.pipe';
import { SecondsToHourPipe } from '../../core/pipes/seconds-to-hour.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    // Pipes
    SecondsToHourPipe,
    PhrasecasePipe,
    SanitizePipe,
    // Components
    DialogComponent,
    SpinnerComponent,
    DialogRecuperarContrasenaComponent,
    AuroraTableComponent,
    FormControlComponent,
    DialogCambiarContrasenaComponent,
    CirculoEstadoAsignacionComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    //Material
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Pipes
    SecondsToHourPipe,
    PhrasecasePipe,
    SanitizePipe,
    // Components
    DialogComponent,
    SpinnerComponent,
    DialogRecuperarContrasenaComponent,
    AuroraTableComponent,
    FormControlComponent,
    NavbarComponent,
    FooterComponent,
    //Material
    MaterialModule,
  ],
  providers: [
    NotificacionesService,
    AuthService,
    IndexedDBService,
    //pipes
    SecondsToHourPipe,
    PhrasecasePipe,
    SanitizePipe,
    AsyncPipe,
    DatePipe,
    //other providers
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
})
export class SharedModule {}
