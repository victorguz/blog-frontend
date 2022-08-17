import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'aurora-helper-dialog',
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})
export class AuroraHelperDialogComponent {

  icon?: string
  color?: string

  constructor(
    public dialogRef: MatDialogRef<AuroraHelperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER" | "WARNING" | "INFO" | "DARK" | "WHITE" | "GRAY",
      title: string, text: string, button: string, func?: () => any
    }
  ) {
    this.setIcon()
    this.data.button = this.data.button ? this.data.button : "Ok"
    this.color = data.type.toLowerCase()
  }

  onCancelClick(event: Event): void {
    this.dialogRef.close(false);
  }

  onOkClick(): void {
    if (typeof this.data.func == 'function') {
      this.data.func()
    }
    this.dialogRef.close(true);
  }

  setIcon() {
    switch (this.data.type) {
      case "SUCCESS": this.icon = "check_circle"; break;
      case "DANGER": this.icon = "error"; break;
      case "WARNING": this.icon = "warning"; break;
      case "INFO": this.icon = "info"; break;
    }
  }
}

