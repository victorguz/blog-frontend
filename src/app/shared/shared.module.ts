import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AuroraHelperDialogComponent } from './components/dialog/dialog.component';
import { RequestsService } from '../core/services/requests.service';
import { HelpersService } from '../core/services/helpers.service';
import { HttpClientModule } from '@angular/common/http';
import { AuroraIconComponent } from './components/aurora-icon/aurora-icon.component';
import { LoadFileComponent } from './components/load-file/load-file.component';
import { ModalService } from '../core/services/modal.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuroraSocialMediaComponent } from './components/aurora-social-media/aurora-social-media.component';

@NgModule({
  declarations: [
    AuroraHelperDialogComponent,
    AuroraIconComponent,
    LoadFileComponent,
    AuroraSocialMediaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Aurora
    AuroraHelperDialogComponent,
    AuroraIconComponent,
    LoadFileComponent,
    AuroraSocialMediaComponent,
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
  ],
  providers: [TimeAgoPipe, RequestsService, HelpersService, ModalService],
})
export class SharedModule {}
