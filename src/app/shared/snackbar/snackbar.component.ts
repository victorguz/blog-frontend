import { Component, Inject } from "@angular/core";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'aurora-helper-snackbar',
  template: `
  <div class="aurora-helper-snackbar-content">
    <div>
      <mat-icon *ngIf="data.icon" class="mr-3">{{data.icon}}</mat-icon>
      <span>{{data.text}}</span>
    </div>
    <button mat-button (click)="onOkClick()" class="no-padding">{{data.button?data.button:"OK"}}</button>
  </div>
  `,
  styleUrls: ["./snackbar.component.scss"],
})
export class AuroraHelperSnackbarComponent {
  constructor(
    public snackbarRef: MatSnackBarRef<AuroraHelperSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { icon: string, text: string, button: string, action: () => any }) {
  }

  onOkClick(): void {
    if (typeof this.data.action == 'function') {
      this.data.action()
    }
    this.snackbarRef.dismiss();
  }
}
