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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormControlComponent } from './components/form-control/form-control.component';
import { IndexedDBService } from './../../core/services/indexed-db.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgModule } from '@angular/core';
import { NotificacionesService } from '../../core/services/notificaciones.service';
import { PhrasecasePipe } from '../../core/pipes/phrasecase.pipe';
import { RequestsService } from '../../core/services/requests.service';
import { RouterModule } from '@angular/router';
import { SanitizePipe } from '../../core/pipes/sanitize.pipe';
import { SecondsToHourPipe } from '../../core/pipes/seconds-to-hour.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PaymentFormComponent } from './components/payments/payment-form/payment-form.component';
import { MercadoPagoFormComponent } from './components/payments/mercado-pago-form/mercado-pago-form.component';

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
    PaymentFormComponent,
    MercadoPagoFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    //Material
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSliderModule,
    DragDropModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
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
    PaymentFormComponent,
    //Material
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSliderModule,
    DragDropModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
  ],
  providers: [
    RequestsService,
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
