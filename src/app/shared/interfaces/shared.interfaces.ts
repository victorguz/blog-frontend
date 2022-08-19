import { SafeUrl } from '@angular/platform-browser';

export interface Base64File {
  id: number;
  nombreArchivo: string;
  base64: string;
  mimeType: string;
  file?: File;
  url?: string | SafeUrl;
}

export enum ModalServiceType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
  INFO = 'INFO',
}

export interface ModalServiceOption {
  text: string;
  okButton?: string;
  cancelButton?: string;
  time?: number;
}

export interface HttpBody {
  url: string;
  params?: any;
  headers?: any;
}
