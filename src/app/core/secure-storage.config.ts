import {
  arrayNotEmpty,
  isArray,
  isEmpty,
  isNotEmptyObject,
  isObject,
} from 'class-validator';
import { environment } from '../../environments/environment';
import SecureStorageImport from 'secure-web-storage';
import { decrypt, encrypt, hash256 } from './services/functions.service';

const secureStorageVar = new SecureStorageImport(localStorage, {
  hash: hash256,
  encrypt: encrypt,
  decrypt: decrypt,
});

// Encriptacion de localStorage
export const secureStorage = {
  getItem(name: string): any {
    if (isEmpty(name)) {
      throw new Error('El nombre de la variable local no puede estar vacío');
    }
    if (environment.encryption.encryptStorage) {
      return secureStorageVar.getItem(name);
    } else {
      const result = localStorage.getItem(name);
      return result ? JSON.parse(result) : null;
    }
  },
  setItem(name: string, data: any): void {
    if (isEmpty(name)) {
      throw new Error('El nombre de la variable local no puede estar vacío');
    }
    if (isEmpty(data)) {
      throw new Error(
        'El valor de la variable local no puede ser una cadena vacía, null o undefined'
      );
    }
    if (
      (isObject(data) && !isNotEmptyObject(data)) ||
      (isArray(data) && !arrayNotEmpty(data))
    ) {
      throw new Error(
        'El valor de la variable local no puede ser un objeto o arreglo vacío'
      );
    }
    if (environment.encryption.encryptStorage) {
      secureStorageVar.setItem(name, data);
    } else {
      localStorage.setItem(name, JSON.stringify(data));
    }
  },
  removeItem(name: string): void {
    if (isEmpty(name)) {
      throw new Error('El nombre de la variable local no puede estar vacío');
    }
    if (environment.encryption.encryptStorage) {
      secureStorageVar.removeItem(name);
    } else {
      localStorage.removeItem(name);
    }
  },
};
