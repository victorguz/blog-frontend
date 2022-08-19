import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalServiceOption, ModalServiceType } from '../../interfaces/shared.interfaces';

@Component({
  selector: 'aurora-helper-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class AuroraHelperDialogComponent {
  icon?: string;
  color?: string;

  constructor(
    public dialogRef: MatDialogRef<AuroraHelperDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      options: ModalServiceOption;
      type: ModalServiceType;
    }
  ) {
    this.setIcon();
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  setIcon() {
    this.color = this.data.type.toLowerCase();
    switch (this.data.type) {
      case ModalServiceType.SUCCESS:
        this.icon = 'check_circle';
        break;
      case ModalServiceType.WARNING:
        this.icon = 'error_outline';
        break;
      case ModalServiceType.DANGER:
        this.icon = 'dangerous';
        break;
      case ModalServiceType.INFO:
        this.icon = 'info';
        break;
    }
  }
}
