import {
  Component,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { isNotEmpty, isObject } from 'class-validator';
import { MENSAJES } from '../../../../core/constants.config';
import { isPassword } from '../../../../core/services/functions.service';
import { CustomValidators } from '../../../../core/validators.config';

@Component({
  selector: 'form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
})
export class FormTextComponent implements OnChanges {
  @Input() public form!: FormGroup;
  @Input() public name!: string;
  @Input() public type: 'password' | 'text' | 'number' = 'text';
  @Input() public label!: string;
  @Input() public placeholder!: string;
  @Input() public error: string = MENSAJES.CAMPO_REQUERIDO;
  @Input() public maxlength: number | string = 30;
  @Input() public regex!: RegExp;
  @Input() public validateRegex: boolean = true;
  @Input() public hiddenLabel: boolean = false;
  @Input() public isSubmitted: boolean = false;
  @Input() public dataSelect: DataSelect[] = [];
  @Input() public minDate!: Date;
  @Input() public maxDate!: Date;
  @Input() public minNumber!: number;
  @Input() public maxNumber!: number;
  @Input() public prefixIcon!: string;
  @Input() public multiple: boolean = false;

  @Input() public isSelect: boolean = false;
  @Input() public isAutocomplete: boolean = false;
  @Input() public isDate: boolean = false;
  @Input() public isDateYear: boolean = false;

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
    this.label = this.label || this.placeholder || this.name;
    this.placeholder = this.placeholder || this.label;
    if (this.dataSelect && this.dataSelect.length > 0 && this.isAutocomplete) {
      this.autoCompleteEvents();
    }
    if (changes['isSubmitted'] && this.isSubmitted && this.control) {
      this.control.markAsTouched();
    }
    if (this.error) {
      this.errorMessage = this.error;
    }
    this.control?.valueChanges.subscribe((val) => {
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
    this.cdRef.detectChanges();
  }

  /** Metodos para validaciones globales, autocompletar  por objeto o por cadena, se encuentro un problema al restablecer los valores  */
  autoCompleteEvents() {
    setTimeout(() => {
      const newValidators: ValidatorFn[] = [
        CustomValidators.autocomplete(this.dataSelect),
      ];
      if (this.isRequired) newValidators.push(Validators.required);
      this.control?.setValidators(newValidators);
      this.autocompleteFirstValue = this.autoCompleteSelectDescription;
      if (this.autocompleteFirstValue) {
        this.filterAutocomplete(this.autocompleteFirstValue, {
          stopPropagation: () => {},
          preventDefault: () => {},
        });
      }
    }, 1000);
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
      : undefined;
  }

  get value() {
    return this.control ? this.control.value : undefined;
  }

  get isNumber() {
    return this.type == 'number';
  }
  get isText() {
    return this.type == 'text';
  }
  get isPassword() {
    return this.type == 'password';
  }
  get isRequired() {
    return this.control?.hasValidator(Validators.required);
  }
  get isDisabled() {
    return this.control?.disabled;
  }
  /**
   * @description define su validez segun el tipo de campo de texto seleccionado
   */
  get isValid() {
    return isPassword(this.value);
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
        this.control?.setValue(this.autoCompleteOptions[0]);
      }, 200);
    }
  }

  get hasValue() {
    return this.value && isNotEmpty(this.value) ? true : false;
  }

  get selectedDescriptionSelect() {
    const find = this.dataSelect.find((val) => val.value == this.value);
    return find ? find.description : '';
  }

  onSubmitMock() {}
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
