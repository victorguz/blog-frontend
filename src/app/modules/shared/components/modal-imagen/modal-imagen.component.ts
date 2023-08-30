import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SanitizePipe } from '../../../../core/pipes/sanitize.pipe';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.scss'],
})
export class ModalImagenComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ModalImagenComponent>,
    @Inject(MAT_DIALOG_DATA)
    public url: string
  ) {}

  ngOnInit(): void {}
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
