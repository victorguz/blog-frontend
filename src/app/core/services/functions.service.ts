import {
  ESTADOS_ASIGNACIONES,
  ESTADOS_PROYECTOS,
  TYPE_OF_FILES,
} from './../constants.config';
import { HttpErrorResponse } from '@angular/common/http';
import { isNotEmpty, isString, arrayNotEmpty } from 'class-validator';
import {
  FormStyle,
  getLocaleDayNames,
  getLocaleMonthNames,
} from '@angular/common';
import { secureStorage } from '../secure-storage.config';
import { FormGroup } from '@angular/forms';
import { REGEX } from '../constants.config';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
import { Buffer } from 'buffer';

///////////////Funciones globales

export function hash256(key) {
  key = CryptoJS.SHA256(key);
  return key.toString();
}
export function hash512(key) {
  key = CryptoJS.SHA512(key);
  return key.toString();
}
export function encrypt(data) {
  data = CryptoJS.AES.encrypt(data, environment.encryption.secret_key);
  data = data.toString();
  return data;
}
export function decrypt(data) {
  data = CryptoJS.AES.decrypt(data, environment.encryption.secret_key);
  data = data.toString(CryptoJS.enc.Utf8);
  return data;
}

/**{
 * }
 * Pone en mayusculas la inicial de cada palabra y en minusculas el resto de las letras en una cadena.
 * @param cad
 * @param split
 */
export function toTitleCase(cad: string, split: string = ' ') {
  cad = cad ? cad.trim().toLowerCase() : '';
  if (isNotEmpty(cad)) {
    let arr = cad.split(split);
    cad = '';
    arr.forEach((e) => {
      if (e) {
        cad += e[0].toUpperCase() + e.substring(1) + ' ';
      }
    });
  }
  return cad;
}

/**
 * Pone en mayusculas la inicial de cada frase separandola por puntos (.)
 * @param cad
 */
export function toPhraseCase(cad: string) {
  return toTitleCase(cad, '.');
}

/**
 * Set the data on secureStorage (secureStorage)
 * @param name item name
 * @param data item data
 */
export function setOnLocal(name: string, data: any) {
  if (!isNotEmpty(name)) {
    throw new Error('El nombre de la variable local no puede estar vacío');
  }
  secureStorage.setItem(name, data);
}
/**
 * Deletes item from secureStorage (secureStorage)
 * @param name
 */
export function removeFromLocal(name: string) {
  if (!isNotEmpty(name)) {
    throw new Error('El nombre de la variable local no puede estar vacío');
  }
  secureStorage.removeItem(name);
}

/**
 * Gets the secureStorage (secureStorage) string by name and parse it like JSON.
 * If it isn't an object, array or string, returns null.
 * @param name
 * @returns the object or array
 */
export function getFromLocal(name: string): any {
  return secureStorage.getItem(name);
}

export function pushToLocalArray(name: string, value: any) {
  let array: any[] = getFromLocal(name);
  if (!array) {
    array = [];
  }
  array.push(value);
  setOnLocal(name, array);
}

export function getBasicError(error: any, print: boolean = false): any {
  if (print) {
    console.error(error);
  }
  if (error instanceof HttpErrorResponse) {
    return error.error;
  }
  return error;
}
export function getErrorMessage(error: any, print: boolean = true): string {
  const error2 = getBasicError(error);
  if (print) {
    console.error(error, error2);
  }
  return error.message ? error.message : 'Error en la petición';
}
export function matchString(
  data: string | null | undefined,
  regex: RegExp = REGEX.match.alfanumerico
): boolean {
  return data && data.match(regex) ? true : false;
}
/**
 * Convierte una fecha en el formato 'dd/mm/yyyy', ideal para oracle
 * @param fecha
 * @param sep separador de las variables de la fecha
 * @returns
 */
export function dateToStringDayMonthYear(fecha: Date, sep: string = '/') {
  return `${fecha.getDate()}${sep}${
    fecha.getMonth() + 1
  }${sep}${fecha.getFullYear()}`;
}

/**
 * Muestra un Spinner (loading) y muestra el mensaje especificado
 * @param message
 */
export function showLoadingSpinner(
  message: string = 'Cargando...',
  number: 1 | 2 = 1
) {
  document
    .getElementById('aurora-spinner-container' + number)
    ?.removeAttribute('hidden');
  const spinnerMessage = document.getElementById(
    'aurora-spinner-message' + number
  );
  spinnerMessage ? (spinnerMessage.innerHTML = message) : '';
}

export function hideLoadingSpinner(number: 1 | 2 = 1) {
  document
    .getElementById('aurora-spinner-container' + number)
    ?.setAttribute('hidden', 'true');
}

export function sortArray(array: any[], key: string | undefined = undefined) {
  if (key) {
    return array.sort((a, b) => {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    });
  }
  return array;
}
/**
 * Obtiene el día del mes segun los dias restados o sumados
 * @param days Días que se desean aumentar o restar
 * @returns
 */
export function getMonthDay(days: number = 0) {
  const date = new Date(new Date().setDate(new Date().getDate() + days));
  return date.getDate();
}

export function getDayName(
  date: Date,
  length: 1 | 2 | 3 | 100 = 100,
  locale: string = 'es_CO'
) {
  let dayLength: number;
  switch (length) {
    case 1:
      dayLength = 0;
      break;
    case 2:
      dayLength = 3;
      break;
    case 3:
      dayLength = 1;
      break;
    case 100:
      dayLength = 2;
      break;
  }
  const days = getLocaleDayNames(locale, FormStyle.Standalone, dayLength);
  const day: number = date.getDay();
  return days[day].toUpperCase();
}

export function getMonthName(
  date: Date,
  length: 1 | 2 | 3 | 100 = 100,
  locale: string = 'es_CO'
) {
  let monthLength: number;
  switch (length) {
    case 1:
      monthLength = 0;
      break;
    case 2:
      monthLength = 3;
      break;
    case 3:
      monthLength = 1;
      break;
    case 100:
      monthLength = 2;
      break;
  }
  const months = getLocaleMonthNames(locale, FormStyle.Standalone, monthLength);
  const month: number = date.getMonth();
  return months[month].toUpperCase();
}

export async function base64ToFileOrBlob(
  loadedFile: string,
  type: 'file' | 'blob' = 'file'
) {
  if (loadedFile != undefined) {
    ('data:image/png;base64,');
    let base64Data;
    let newFile;
    if (isString(loadedFile)) {
      newFile = {
        mimeType: loadedFile.substring(
          loadedFile.indexOf(':') + 1,
          loadedFile.indexOf(';base64,')
        ),
        nombreArchivo:
          'archivo.' +
          loadedFile.substring(
            loadedFile.indexOf('/') + 1,
            loadedFile.indexOf(';base64,')
          ),
      };
      base64Data = loadedFile;
    }
    const res = await fetch(base64Data);
    return type == 'file'
      ? new File([await res.arrayBuffer()], newFile.nombreArchivo, {
          type: newFile.mimeType,
        })
      : await res.blob();
  }
  return null;
}

export function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(<string>reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Crea una fecha con los dias de mas o menos indicados
 * @param days dias indicados
 * @returns
 */
export function minDateForInput(days: number) {
  return new Date(new Date().setDate(new Date().getDate() + days));
}

export function getClassEstadoAsignacion(estado: ESTADOS_ASIGNACIONES) {
  switch (estado) {
    case ESTADOS_ASIGNACIONES.EN_PROCESO:
      return 'border bg-primary';
    case ESTADOS_ASIGNACIONES.FINALIZADO:
      return 'border bg-success';
    case ESTADOS_ASIGNACIONES.CON_AJUSTES:
      return 'border bg-info';
    case ESTADOS_ASIGNACIONES.EN_REVISIÓN:
      return 'border bg-tertiary';
    case ESTADOS_ASIGNACIONES.VENCIDO:
      return 'border bg-danger';
    case ESTADOS_ASIGNACIONES.SIN_INICIAR:
    default:
      return 'border';
  }
}

export function getClassEstadoProyecto(estado: ESTADOS_PROYECTOS) {
  switch (estado) {
    case ESTADOS_PROYECTOS.EN_PROCESO:
      return 'border bg-primary';
    case ESTADOS_PROYECTOS.FINALIZADO:
      return 'border bg-success';
    case ESTADOS_PROYECTOS.VENCIDO:
      return 'border bg-danger';
    case ESTADOS_PROYECTOS.SIN_INICIAR:
      return 'border bg-light';
    case ESTADOS_PROYECTOS.SIN_ASIGNACIONES:
    default:
      return 'border';
  }
}

export function eliminarRepetidosArray(array: any[], key: string = 'id') {
  let map = array.map((value) => value[key]);
  map = map.filter((item, index) => {
    return map.indexOf(item) === index;
  });
  return map.map((id) => array.find((value) => value[key] === id));
}

export function transformStringToDate(date: string): Date | null {
  const split = date ? date.split('-') : [];
  if (!date && !arrayNotEmpty(split)) {
    return null;
  }
  const newDate = new Date(+split[0], +split[1] - 1, +split[2]);
  return newDate;
}

export function isValidFileSize(
  file: File,
  MAX_UPLOAD_BYTES: number = environment.MAX_UPLOAD_BYTES
) {
  return file.size <= MAX_UPLOAD_BYTES;
}

export function isValidFileExtension(
  file: File | { name: string },
  fileExtensions: TYPE_OF_FILES
) {
  const extensions = fileExtensions
    .replaceAll(/[\.\,]/g, '')
    .toLowerCase()
    .split(' ');

  let ext = file.name.split('.').pop()!.toLowerCase();
  return extensions.includes(ext);
}

export function friendlyStringTag(cad: string) {
  return cad
    .toLowerCase()
    .trim()
    .replaceAll(' ', '-')
    .replaceAll(REGEX.replace.repetidos, '')
    .replaceAll(REGEX.replace.friendlyString, '');
}

export function friendlyString(cad: any) {
  cad = String(cad);
  return cad.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case '\0':
        return '\\0';
      case '\x08':
        return '\\b';
      case '\x09':
        return '\\t';
      case '\x1a':
        return '\\z';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '"':
      case "'":
      case '\\':
      case '%':
        return '\\' + char; // prepends a backslash to backslash, percent,
      // and double/single quotes
      default:
        return char;
    }
  });
}
export function friendlyObject(obj: any) {
  obj = cloneObject(obj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] == 'object') {
        obj[key] = friendlyObject(obj[key]);
      } else {
        obj[key] = friendlyString(obj[key]);
      }
    }
  }
  return obj;
}
export function scrollToElement(querySelector: string) {
  document.querySelector(querySelector)!.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  });
}
export function cloneObject(object: any) {
  return object ? JSON.parse(JSON.stringify(object)) : object;
}
