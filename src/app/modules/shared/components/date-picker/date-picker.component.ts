import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { arrayNotEmpty, isNotEmpty } from 'class-validator';
import { ModalOptions } from '../../../../core/interfaces/shared.interfaces';
import { HelpersService } from '../../../../core/services/helpers.service';

@Component({
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  form: FormGroup;
  color = 'primary';
  hasError = false;

  constructor(
    private helpers: HelpersService,
    private dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      options: ModalOptions;
      type: 'confirmation' | 'info';
      color?: 'primary' | 'danger';
      includeHour: boolean;
      initialValue?: Date;
    }
  ) {
    this.color = data.color ? data.color : this.color;
console.log(data.initialValue);

    this.form = this.helpers.formBuilder.group({
      selectedHour: [data.initialValue, Validators.required],
      selectedDate: [
        data.initialValue?.getHours() ||
          0 + ':' + data.initialValue?.getMinutes() ||
          0,
        data.includeHour ? Validators.required : undefined,
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.date);
    } else this.hasError = true;
  }

  get isValidHour() {
    return isNotEmpty(this.hour) && arrayNotEmpty(this.hour);
  }

  get date() {
    const selectedDate = this.form.get('selectedDate')?.getRawValue();
    const hour = this.hour;
    if (selectedDate && hour) {
      selectedDate.setHours(hour[0], hour[1]);
    }
    return selectedDate;
  }

  get hour() {
    const selectedHour = this.form.get('selectedHour')?.getRawValue();
    console.log(selectedHour);
    if (isNotEmpty(selectedHour)) {
      const hour = selectedHour.split(':');

      return hour;
    }
    return null;
  }
}
