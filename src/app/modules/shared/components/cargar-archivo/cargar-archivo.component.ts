import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { isEmpty } from 'class-validator';
import { TYPE_OF_FILES } from '../../../../core/constants.config';
import { isValidFileExtension, isValidFileSize } from '../../../../core/services/functions.service';


@Component({
  selector: 'cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.scss'],
})
export class CargarArchivoComponent implements OnChanges, AfterViewInit {
  @ViewChild('inputFile') inputFileRef!: ElementRef;
  @Input()
  apariencia: 'imagen' | 'archivos' = 'imagen';
  @Input() maxFileBytes: number = 1e6;
  @Input() reset: number = 0;
  @Input() imageMaxWidth: number = 1080;
  @Input() imageMaxHeight: number = 720;
  @Input() disabled: boolean = false;
  @Output() archivo = new EventEmitter<ArchivosInterface | null>();
  @Output() formData = new EventEmitter<FormData | null>();

  inputFile!: HTMLInputElement;
  file!: ArchivosInterface | null;
  isBadFile: boolean = false;
  tiposPermitidos: TYPE_OF_FILES = TYPE_OF_FILES.PDF;

  errorMessage = '';

  constructor() { }

  ngAfterViewInit(): void {
    this.inputFile = this.inputFileRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apariencia']) {
      this.tiposPermitidos = this.isImage
        ? TYPE_OF_FILES.IMAGEN
        : TYPE_OF_FILES.PDF;
    }
    if (changes['reset'] && this.reset) {
      this.borrarArchivo();
    }
  }

  get isImage() {
    return this.apariencia == 'imagen';
  }

  /**
   * @description captura el archivo para en un array de strings
   * @param event
   */
  public capturarArchivo() {
    this.file = null;
    if (this.inputFile.files && this.inputFile.files.length > 0) {
      const data = new FormData();
      const file = this.inputFile.files[0];
      this.isBadFile = false;
      if (
        isValidFileSize(file, this.maxFileBytes) &&
        isValidFileExtension(file, this.tiposPermitidos)
      ) {
        this.isBadFile = false;
        this.extraerBase64(file).then((archivo: any) => {
          this.file = {
            nombre: file.name,
            base64: archivo.split('base64,').pop(), //ignorar mimetype y enviar solo base64
            file: file,
            extensionArchivo: file.name.split('.').pop()?.toUpperCase() || '',
          };
          data.append(this.file.nombre, file, this.file.nombre);
          this.formData.emit(data);
          this.archivo.emit(this.file);
        });
      } else {
        this.isBadFile = true;
        this.borrarArchivo();
      }
    }
  }

  /**
   * @description retorna la base64 de la imagen que se ingreso
   * @param $event
   * @returns
   */
  extraerBase64 = async ($event: File) =>
    new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        return null;
      } catch (error) {
        return null;
      }
    });

  get fileName() {
    const exist = this.file && this.file.nombre;
    if (exist) {
      const extension = this.file!.nombre.split('.').pop();
      const shortName =
        this.file!.nombre.length > 25
          ? this.file!.nombre.substring(0, 25) + '...' + extension
          : this.file!.nombre;
      return shortName;
    }
    return '';
  }

  isValidImageSize(file: File) {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;
    img.onload = () => {
      this.errorMessage = '';
      if (img.width > this.imageMaxWidth || img.height > this.imageMaxHeight) {
        this.isBadFile = true;
        this.borrarArchivo();
        this.errorMessage = `La imágen debe tener una resolución máxima de <strong>${this.imageMaxWidth}x${this.imageMaxHeight}px</strong>`;
      }
      URL.revokeObjectURL(objectUrl);
    };
    return isEmpty(this.errorMessage);
  }

  borrarArchivo() {
    this.errorMessage = '';
    this.inputFile.value = '';
    this.file = null;
    this.formData.emit(null);
    this.archivo.emit(null);
  }
}

export interface ArchivosInterface {
  nombre: string;
  file: File;
  base64: string;
  extensionArchivo: string;
}
