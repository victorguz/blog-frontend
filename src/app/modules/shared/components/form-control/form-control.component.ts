import {
  Component,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isObject } from 'class-validator';
import { MENSAJES } from '../../../../core/constants.config';
import { CustomValidators } from '../../../../core/validators.config';

@Component({
  selector: 'form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnChanges {
  @Input() public form!: FormGroup;
  @Input() public name!: string;
  @Input() public type:
    | 'textarea'
    | 'date'
    | 'select'
    | 'text'
    | 'number'
    | 'email'
    | 'autocomplete'
    | 'time'
    | 'password' = 'text';
  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public error: string = MENSAJES.CAMPO_REQUERIDO;
  @Input() public maxlength: number | string = 30;
  @Input() public hiddenLabel: boolean = false;
  @Input() public isSubmitted: boolean = false;
  @Input() public dataSelect: DataSelect[] = [];
  @Input() public minDate!: Date;
  @Input() public maxDate!: Date;
  @Input() public minNumber!: number;
  @Input() public maxNumber!: number;
  @Input() public rows: number=4;
  @Input() public prefixIcon!: string;
  @Input() public multiple: boolean = false;

  @Output() public blur = new EventEmitter<any>();
  @Output() public input = new EventEmitter<any>();
  @Output() public change = new EventEmitter<any>();
  @Output() public enter = new EventEmitter<any>();

  public hidePassword: boolean = true;
  private errorMessage: string = '';
  public autoCompleteOptions!: DataSelect[];
  public autocompleteFirstValue = '';

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['label'] || changes['placeholder']) this.setLabel();
    if (
      changes['dataSelect'] &&
      this.dataSelect &&
      this.dataSelect.length > 0 &&
      this.isAutocomplete
    ) {
      this.autoCompleteValidators();
    }
    if (changes['isSubmitted'] && this.isSubmitted && this.control) {
      this.control.markAsTouched();
    }
    this.setErrors();
    this.cdRef.detectChanges();
  }

  setErrors() {
    if (this.error) {
      this.errorMessage = this.error;
    }
    this.control.valueChanges.subscribe((val) => {
      if (this.control!.errors) {
        if (this.control!.errors['required']) {
          this.error = MENSAJES.CAMPO_REQUERIDO;
        } else if (this.control!.errors['invalidAutocomplete']) {
          this.error = MENSAJES.CAMPO_INVALIDO;
        } else {
          this.error = this.errorMessage || MENSAJES.CAMPO_REQUERIDO;
        }
      }
    });
  }

  setLabel() {
    this.label = this.label || this.placeholder || this.name;
    this.placeholder = this.placeholder || this.label;
  }

  autoCompleteValidators() {
    setTimeout(() => {
      this.control.addValidators(
        CustomValidators.autocomplete(this.dataSelect)
      );
    }, 1000);
  }

  get isSelect(): boolean {
    return this.type == 'select';
  }

  get isPassword(): boolean {
    return this.type == 'password';
  }

  get isInput(): boolean {
    return ['text', 'number', 'email', 'password',"time"].includes(this.type);
  }

  get isTextarea(): boolean {
    return ['textarea'].includes(this.type);
  }

  get isAutocomplete(): boolean {
    return this.type == 'autocomplete';
  }

  get isDate(): boolean {
    return this.type == 'date';
  }

  get autoCompleteSelectDescription() {
    const find = isObject(this.value)
      ? undefined
      : this.dataSelect.find((item) => item.value == this.value);
    return find ? find.description : '';
  }

  get control() {
    return this.form && this.name && this.form.controls[this.name]
      ? this.form.controls[this.name]
      : new FormControl('');
  }

  get value() {
    return this.control ? this.control.value : undefined;
  }

  get isRequired() {
    return this.control.hasValidator(Validators.required);
  }

  get isDisabled() {
    return this.control.disabled;
  }

  onBlur(event: any) {
    this.blur.emit(event);
  }

  onInput(event: any) {
    this.input.emit(event);
  }

  onChange(event: any) {
    this.change.emit(event);
  }

  onChagneAutocomplete(event: any) {
    this.change.emit(event);
  }

  onEnter(event: any) {
    this.enter.emit(event);
  }

  public displayFn(item: DataSelect): string {
    return item?.description;
  }

  public filterAutocomplete(texto: string | number | any, event: any) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newTexto = String(texto).toLowerCase().trim();

    this.autoCompleteOptions = this.dataSelect.filter((data) =>
      data.description.toLowerCase().includes(newTexto)
    );
    if (event) {
      this.setAutocompleteValue();
      this.onChange(event);
    }
  }

  setAutocompleteValue() {
    if (
      this.autoCompleteOptions.length == 1 &&
      this.autoCompleteOptions[0].description == this.autocompleteFirstValue
    ) {
      // Hay una espera entre que el cambio se aplica y que el cambio se nota
      setTimeout(() => {
        this.control.setValue(this.autoCompleteOptions[0]);
      }, 200);
    }
  }

  get selectedDescriptionSelect() {
    const find = this.dataSelect.find((val) => val.value == this.value);
    return find ? find.description : '';
  }
}

export interface DataSelect {
  /** el valor que será seleccionado */
  value: any;
  /** el texto que tendrá la opción */
  description: string;

  /**
   * clase del circulo rojo de estado
   */
  statusClass?: string;

  /**
   * Texto que se mostrará al lado derecho del select
   */
  details?: string;
  disabled?: boolean;
}
