import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNotEmpty, isNumber, isObject, isString } from 'class-validator';
import { DataSelect } from '../modules/shared/components/form-text/form-text.component';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static validar(password: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    };
  }

  static autoCompleteSelectValidator(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //Validar si tiene valor y descripcion significa que es una selección válida
      return control.value && control.value.value && control.value.description;
    };
  }

  static validarPesoVacio = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const peso = control.value as number;

      return peso < 0.2 || peso > 53 ? { pesoNoValido: true } : null;
    };
  };

  static validarIgualdad = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const nuevaPassword = control.get('password')?.value as string;
      const confirmarPassword = control.get('confirmPassword')?.value as string;
      if (nuevaPassword != confirmarPassword) {
        return { passNoEqual: true };
      }
      return null;
    };
  };

  static autocomplete(data: DataSelect[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isObjectBool =
        isObject(control.value) &&
        !isString(control.value) &&
        !isNumber(control.value);
      const value = isObjectBool ? control.value['value'] : control.value;

      const find = data.find((item) =>
        isObjectBool ? item.value === value : item.description === value
      );
      return isNotEmpty(find) ? null : { invalidAutocomplete: true };
    };
  }
}
