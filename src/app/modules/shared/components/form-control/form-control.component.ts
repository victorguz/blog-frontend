import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmail, isEmpty, isNumber, isNumberString } from 'class-validator';
import {
  isPassword,
  isValidFileExtension,
  isValidFileSize,
  matchString,
  transformStringToDate,
} from '../../../../core/services/functions.service';

import { DatePipe } from '@angular/common';
import { TYPE_OF_FILES } from './../../../../core/constants.config';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnChanges {
  @ViewChild('input') inputRef!: ElementRef;
  @Input() public form!: FormGroup;
  @Input() public type:
    | 'text'
    | 'file'
    | 'textarea'
    | 'dataList'
    | 'date'
    | 'datetime'
    | 'select'
    | 'number'
    | 'email'
    | 'password' = 'text';
  @Input() public name!: string;
  @Input() public min!: Date | string;
  @Input() public max!: Date;
  @Input() public label!: string;
  @Input() public tooltip!: string;
  @Input() public placeholder!: string;
  @Input() public isSubmited: boolean = false;
  @Input() public maxlength: number | string = 30;
  @Input() public maxFileBytes: number = environment.MAX_UPLOAD_BYTES;
  @Input() public regex!: RegExp;
  @Input() public dataSelect: FormControlComponentDataSelect[] = [];
  @Input() public isPhrasecase: boolean = true;
  @Input() public multiple: boolean = false;
  @Input() public disabled: boolean = false;
  @Input() public onlyAccept: string = '';
  @Input() public validateRegex: boolean = true;
  @Input() public hiddenLabel: boolean = false;
  @Input() public hiddenError: boolean = false;
  @Input() public hiddenDefault: boolean = false;
  @Input() public formClass: string = '';
  @Input() public idDataList: string = '';
  @Output() public changeValue = new EventEmitter<any>();
  @Input() public value: any;
  @Output() public blur = new EventEmitter<any>();
  @Output() public input = new EventEmitter<any>();
  @Output() public change = new EventEmitter<any>();
  @Output() public enter = new EventEmitter<any>();
  @Output() public validate = new EventEmitter<any>();
  public isDirty: boolean = false;
  public isBadFile: boolean = false;
  public validator = Validators.required;
  public componentType: 'dataList' | 'select' | 'input' | 'textarea' = 'input';
  public focusOut: boolean = false;
  private ignoredValidationTypes = ['date', 'datetime', 'text'];
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isSubmited'] &&
      changes['isSubmited'].previousValue &&
      !changes['isSubmited'].currentValue
    ) {
      this.isDirty = false;
    }
    if (!this.form) {
      this.form = new FormGroup({
        [this.name]: new FormControl(),
      });
    } else {
      this.value = this.form.get(this.name)?.value;
    }
    this.setComponentType();
    this.setTooltip();
    this.setLabel();
    this.form.get(this.name)?.setValue(this.value);
    this.cdRef.detectChanges();
  }
  setLabel() {
    if (this.label && !this.placeholder) {
      this.placeholder = this.label;
    } else if (!this.label && this.placeholder) {
      this.label = this.placeholder;
    } else if (!this.label && !this.placeholder) {
      this.label = this.name;
      this.placeholder = this.name;
    }
  }
  get isInput(): boolean {
    return this.componentType == 'input' && !this.type.includes('date');
  }
  get isDatalist(): boolean {
    return this.componentType == 'dataList';
  }
  get isSelect(): boolean {
    return this.componentType == 'select';
  }
  get isTextarea(): boolean {
    return this.componentType == 'textarea';
  }
  get isDate(): boolean {
    return this.type == 'date';
  }
  get accept() {
    return this.isFile ? this.onlyAccept || TYPE_OF_FILES.ALL : undefined;
  }
  get isFile() {
    return this.type == 'file';
  }
  get maxLength() {
    return this.isInput || this.isTextarea ? this.maxlength : undefined;
  }

  /**
   * @description Selecciona el tipo de componente
   */
  setComponentType() {
    if (this.type == 'select') {
      this.componentType = 'select';
    } else if (this.type == 'dataList') {
      this.componentType = 'dataList';
    } else if (this.type == 'textarea') {
      this.componentType = 'textarea';
    } else if (this.type.includes('date')) {
      if (!this.min) {
        this.min = new Date();
      }
      if (typeof this.min == 'string') {
        this.min = transformStringToDate(this.min) || new Date();
      }
      // Transform string date to date
    } else {
      this.componentType = 'input';
    }
  }

  /**
   * type of input
   */
  get inputType() {
    const isNumber = this.type == 'number';
    return isNumber ? 'number' : this.type;
  }

  /**
   * @description define el mensaje que se va a mostrar en el tooltip
   */
  setTooltip() {
    if (this.validateRegex && !this.tooltip) {
      if (this.regex) {
        this.tooltip = 'Error: debe poner un tooltip explicando su REGEX.';
      } else {
        switch (this.type) {
          case 'password':
            this.tooltip =
              'La contraseña debe tener por lo menos 6 dígitos, 3 de los cuales deben ser de los siguientes tipos de caractér: minúsculas, mayúsculas, números, especiales.';
            break;
          case 'number':
            this.tooltip = 'Este campo solo acepta números.';
            break;
          case 'email':
            this.tooltip = 'Este no es un formato de email válido.';
            break;
          case 'date':
          case 'datetime':
            this.tooltip = `La fecha seleccionada debe estar en el rango habilitado.`;
            break;
          case 'file':
            this.tooltip = `Los tipos de archivo permitidos son ${
              this.accept
            } y no deben superar los ${this.maxFileBytes / 1000000}MB`;
            break;
        }
      }
    }
  }

  /**
   * Valida si el campo es requerido
   * @returns
   */
  isRequiredField() {
    this.setTooltip();
    if (this.hiddenError) return false;
    const control = this.form.get(this.isFile ? 'file' : this.name);
    const value = control?.value;
    const errors = !isEmpty(control?.errors);
    const invalid = this.isFile
      ? !this.isValid()
      : !this.isValid() || !control?.valid;
    if (value) this.isDirty = true;
    const empty = isEmpty(value);

    if (this.isSubmited || (this.isDirty && this.focusOut)) {
      return (invalid && empty) || errors;
    }
    return false;
  }

  /**
   * @description define su validez segun el tipo de campo de texto seleccionado
   */
  isValid() {
    const control = this.form.get(this.isFile ? 'file' : this.name);
    const value = control?.value;
    const empty = isEmpty(value);
    if (this.isDate) {
      return this.isDateGreaterThanMin;
    } else if (this.isFile) {
      return !this.isBadFile;
    } else if (this.regex && this.validateRegex) {
      return matchString(value, this.regex);
    } else if (
      this.validateRegex &&
      !this.ignoredValidationTypes.includes(this.type)
    ) {
      return (
        (this.type == 'email' && isEmail(value)) ||
        (this.type == 'password' && isPassword(value)) ||
        (this.type == 'number' && (isNumber(value) || isNumberString(value)))
      );
    }
    return true;
  }

  get isDateGreaterThanMin() {
    const value = this.form.get(this.name)?.value;

    if (this.type.includes('date') && value) {
      const dateValue =
        typeof value == 'string' ? transformStringToDate(value) : value;
      const min = this.min as Date;
      const result = dateValue > min;
      return result;
    }
    return false;
  }

  replaceCharacters(event: InputEvent) {
    if (
      this.regex &&
      this.validateRegex &&
      !matchString(event.data, this.regex)
    ) {
      this.form
        .get(this.name)
        ?.setValue(this.form.get(this.name)?.value.replaceAll(event.data, ''));
    } else if (this.type == 'number') {
      if (!isNumber(+event.data!) || !isNumberString(event.data)) {
        this.form
          .get(this.name)
          ?.setValue(
            this.form.get(this.name)?.value.replaceAll(event.data, '')
          );
      }
    }
  }

  emitValue() {
    this.form.get(this.name)?.setValue(this.value);
    this.changeValue.emit(this.form.get(this.name)?.value);
  }

  onBlur(event: any) {
    this.onValidate();
    this.focusOut = !this.isValid();
    this.blur.emit(event);
  }

  onInput(event: any) {
    this.onValidate();
    this.replaceCharacters(event);
    this.input.emit(event);
  }

  onChange(event: any) {
    this.onFileChange(event);
    this.onValidate();
    this.change.emit(event);
  }

  onEnter(event: any) {
    this.onValidate();
    this.enter.emit(event);
  }

  onValidate() {
    this.setTooltip();
    this.validate.emit({
      required: this.isRequiredField(),
      tooltip: this.tooltip,
    });
  }

  onFileChange(event: any) {
    this.isBadFile = false;
    if (this.isFile && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) this.isDirty = true;

      if (
        isValidFileSize(file, this.maxFileBytes) &&
        isValidFileExtension(file, TYPE_OF_FILES.ALL)
      ) {
        this.isBadFile = false;
        this.form.patchValue({
          file,
        });
      } else {
        this.isBadFile = true;
        this.form.patchValue({
          [this.name]: null,
          file: null,
        });
      }
    }
  }
}

export interface FormControlComponentDataSelect {
  value: any;
  description: string;
}
