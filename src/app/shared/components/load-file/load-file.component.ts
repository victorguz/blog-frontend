import {
  Component,
  EventEmitter,
  Input,
  Output,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LIMITE_CARGA } from '../../../core/constants.config';
import { base64ToFile } from '../../../core/services/functions.service';
import { ModalService } from '../../../core/services/modal.service';
import { Base64File } from '../../interfaces/shared.interfaces';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.scss'],
})
export class LoadFileComponent {
  /**
   * Es el output del base64 del file seleccionado.
   * Cuando es null o string vacio es porque se utilizó la opcion de borrar
   */
  @Output() onChangeFile = new EventEmitter<Base64File | null>();
  @Input() loadedFile?: Base64File;
  /**
   * Apariencia de botón normal o boton de iconos
   */
  @Input() apariencia: 'normal' | 'icon' | 'new' = 'normal';
  /**
   * Mostrar u ocultar el boton de descargar cuando hay un file seleccionado o cargado
   */
  @Input() downloadIcon: boolean = true;
  /**
   * Mostrar u ocultar el boton de cargar (sirve en caso que solo se quiera ver el de descargar o eliminar)
   */
  @Input() uploadIcon: boolean = true;

  /**
   * Mostrar u ocultar el boton de eliminar
   */
  @Input() deleteIcon: boolean = true;

  /**
   * Deshabilita el boton de descargar en caso que sea visible
   */
  @Input() disableDownload: boolean = false;
  /**
   * Deshabilita el boton de cargar en caso que sea visible
   */
  @Input() disableUpload: boolean = false;
  /**
   * Limpia los inputs y files seleccionados una vez son enviados en onChangeFile
   */
  @Input() reset: boolean = false;
  /**
   * Es el texto para el boton de cargar
   */
  @Input() textoCargar!: string;
  /**
   * Es el texto para el boton de descargar
   */
  @Input() textoDescargar!: string;

  @Input() fileExtension: string = '.pdf';

  public file!: File | null;

  constructor(
    private modal: ModalService,
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * @description regresa el file seleccionado
   */
  retornarArchivo(e: any, input: HTMLInputElement) {
    this.file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    if (this.file != null && this.validacionesArchivo(this.file)) {
      this.toBase64(this.file).then(async (d: string) => {
        const file = d.split(',');
        const newFile: Base64File = {
          id: 0,
          base64: file[1],
          mimeType: this.file!.type,
          nombreArchivo: this.file!.name,
          url: this.domSanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(this.file!)
          ),
        };
        this.onChangeFile.emit(newFile);
      });
    }
    if (this.reset) {
      this.borrarArchivoCargadoLocalmente(input);
    }
  }

  /**
   * @description borra el file localmente (este cambio no se aplica en la base de datos, solo en la sesión)
   */
  borrarArchivo(input: HTMLInputElement) {
    this.modal
      .modalWarning({
        text: `Estás a punto de borrar el file. ¿Estás seguro? Esta acción no se puede deshacer.`,
      })
      .subscribe(async (result: boolean) => {
        if (result) {
          this.onChangeFile.emit(null);
          this.borrarArchivoCargadoLocalmente(input);
        }
      });
  }

  /**
   * Borra el file cargado en el input
   * @param input
   */
  borrarArchivoCargadoLocalmente(input: HTMLInputElement) {
    input.value = '';
    this.file = null;
    this.loadedFile = undefined;
  }
  /**
   * @description retorna file a string base64
   * @param file file
   * @returns promesa
   */
  toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * @description valida extensión file
   * @param fileName nombre file
   * @returns boleano
   */
  validarExtensionArchivo(fileName: string) {
    let resultado = false;
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      if (this.fileExtension.includes(extension[0])) {
        resultado = true;
      }
    }
    return resultado;
  }

  /**
   * @description valida tamaño file pdf
   * @param size tamaño file
   * @returns boleano
   */
  validarTamanioArchivo(size: number) {
    return (size / 1024 / 1024).toFixed(4) <= LIMITE_CARGA ? true : false;
  }

  /**
   * @description valida que cumpla con el máximo permitido en la carga
   * @param file file
   * @returns boleano
   */
  validacionesArchivo(file: File): boolean {
    let resultado: boolean = false;
    if (this.validarExtensionArchivo(file.name)) {
      if (this.validarTamanioArchivo(file.size)) {
        resultado = true;
      }
    }
    return resultado;
  }

  async abrirArchivo() {
    if (this.file) {
      window.open(URL.createObjectURL(this.file));
    }
  }
}
