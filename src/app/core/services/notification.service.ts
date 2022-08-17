import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "../../../environments/environment";
import { AuroraHelperDialogComponent } from "../../shared/imports/components/dialog/dialog.component";
import { AuroraHelperSnackbarComponent } from "../../shared/imports/components/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    protected _snackBar: MatSnackBar,
    protected _dialog: MatDialog,
  ) { }
  /**
    * Open a snakbar type with the message and function
    * @param type
    * @param message
    * @param button
    * @param time
    * @param action
    */
  public showMessage(type: "SUCCESS" | "DANGER" | "WARNING" | "INFO",
    text: string,
    button: string = "",
    time = 2000,
    action: () => any = () => undefined) {
    let _class = "whiteSnackbar"
    let _icon = ""
    switch (type) {
      case "SUCCESS":
        _class = "successSnackbar"
        _icon = "check_circle"
        break;
      case "WARNING":
        _class = "warningSnackbar"
        _icon = "error_outline"
        break;
      case "DANGER":
        _class = "dangerSnackbar"
        _icon = "dangerous"
        break;
      case "INFO":
        _class = "infoSnackbar"
        _icon = "info"
        break;
    }

    const snackBarRef = this._snackBar.openFromComponent(AuroraHelperSnackbarComponent, {
      duration: time,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: _class,
      data: {
        icon: _icon, text, button, action
      }
    });

    snackBarRef.onAction().subscribe(action())
    return snackBarRef
  }



  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public successMessage(message: string, button: string = "", action: () => any = () => undefined) {
    return this.showMessage("SUCCESS", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public errorMessage(message: string, button: string = "", action: () => any = () => undefined) {
    return this.showMessage("DANGER", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public warningMessage(message: string, button: string = "", action: () => any = () => undefined) {
    return this.showMessage("WARNING", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public infoMessage(message: string, button: string = "", action: () => any = () => undefined) {
    return this.showMessage("INFO", message, button, environment.MESSAGES_DURATION, action)
  }
  /**
   * Shows a modal dialog
   * @param options
   */
  showDialog(type: "SUCCESS" | "DANGER" | "WARNING" | "INFO",
    title: string,
    text: string,
    button: string = "",
    action: (() => any) = (() => undefined),
    width: string = "fit-content",
    height: string = "fit-content") {

    return this._dialog.open(AuroraHelperDialogComponent, {
      data: { type, title, text, button, action },
      width,
      height,
    });
  }


  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public successDialog(message: string, title: string = "¡success!", button: string = "OK", action: (() => any) = (() => undefined)) {
    return this.showDialog("SUCCESS", title, message, button, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public errorDialog(message: string, title: string = "¡error!", button: string = "OK", action: (() => any) = (() => undefined)) {
    return this.showDialog("DANGER", title, message, button, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public warningDialog(message: string, title: string = "¡warning!", button: string = "OK", action: (() => any) = (() => undefined)) {
    return this.showDialog("WARNING", title, message, button, action)
  }
  /**
   * Shows a toast message
   * @param message
   * @param button
   * @param action
   */
  public infoDialog(message: string, title: string = "¡info!", button: string = "OK", action: (() => any) = (() => undefined)) {
    return this.showDialog("INFO", title, message, button, action)
  }
}
