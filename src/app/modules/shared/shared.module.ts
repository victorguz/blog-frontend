import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuroraTableComponent } from './components/table/table.component';
import { AuthInterceptor } from '../../core/auth/auth.interceptor';
import { AuthService } from '../../core/auth/auth.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { IndexedDBService } from './../../core/services/indexed-db.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { NotificacionesService } from '../../core/services/notificaciones.service';
import { PhrasecasePipe } from '../../core/pipes/phrasecase.pipe';
import { RouterModule } from '@angular/router';
import { SanitizePipe } from '../../core/pipes/sanitize.pipe';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CargarArchivoComponent } from './components/cargar-archivo/cargar-archivo.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';

@NgModule({
  declarations: [
    // Pipes
    PhrasecasePipe,
    SanitizePipe,
    // Components
    DialogComponent,
    SpinnerComponent,
    AuroraTableComponent,
    FormControlComponent,
    NavbarComponent,
    FooterComponent,
    CargarArchivoComponent,
    TextEditorComponent,
    DatePickerComponent,
    ModalImagenComponent,
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
    PhrasecasePipe,
    SanitizePipe,
    // Components
    DialogComponent,
    SpinnerComponent,
    AuroraTableComponent,
    FormControlComponent,
    NavbarComponent,
    FooterComponent,
    CargarArchivoComponent,
    TextEditorComponent,
    DatePickerComponent,
    ModalImagenComponent,
    //Material
    MaterialModule,
  ],
  providers: [
    NotificacionesService,
    AuthService,
    IndexedDBService,
    //pipes
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
