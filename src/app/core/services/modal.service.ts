import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AuroraHelperDialogComponent } from '../../shared/components/dialog/dialog.component';
import { ModalServiceOption, ModalServiceType } from '../../shared/interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(protected dialog: MatDialog) {}

  /**
   * Shows a modal dialog
   * @param options
   */
  modalShow(
    options: ModalServiceOption,
    type: ModalServiceType = ModalServiceType.INFO,
    width?: string,
    height?: string
  ) {
    let subject = new Subject<boolean>();

    const dialogRef = this.dialog.open(AuroraHelperDialogComponent, {
      data: { options, type },
      width,
      height,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      subject.next(result);
    });

    return subject.asObservable();
  }

  /**
   * Shows a toast message
   */
  public modalSuccess(options: ModalServiceOption) {
    return this.modalShow(options, ModalServiceType.SUCCESS);
  }
  /**
   * Shows a toast message
   */
  public modalError(options: ModalServiceOption) {
    return this.modalShow(options, ModalServiceType.DANGER);
  }
  /**
   * Shows a toast message
   */
  public modalWarning(options: ModalServiceOption) {
    return this.modalShow(options, ModalServiceType.WARNING);
  }
  /**
   * Shows a toast message
   */
  public modalInfo(options: ModalServiceOption) {
    return this.modalShow(options, ModalServiceType.INFO);
  }
}
