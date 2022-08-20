import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

import html2canvas from 'html2canvas';
import { base64ToFile } from '../../../../../core/services/functions.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit, AfterViewInit {
  @ViewChild('videoRef') videoRef!: ElementRef;
  @ViewChild('canvasRef') canvasRef!: ElementRef;
  video!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;

  context!: CanvasRenderingContext2D;
  points: any[] = [];
  isMouseDown: boolean = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (evt: any) => {
    if (this.isDragging(evt)) {
      console.log(evt.target.id);
      this.write({ x: evt.clientX, y: evt.clientY });
    } else {
      this.mouseUp();
    }
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.render();
  }

  crearImagen(element: HTMLElement): Promise<HTMLCanvasElement> {
    return html2canvas(element);
  }

  /**
   * Pausa el video y realiza la toma del frame del video
   */
  public async takeVideoFrame() {
    this.video.pause();
    const image: HTMLImageElement = document.querySelector('.taken-image')!;
    image.src = (await this.crearImagen(this.video)).toDataURL();
    this.setVisibleFrame(true);
  }

  /**
   * Toma una captura de la imagen incluyendo el dibujo hecho sobre ella
   */
  async takeDrawedImage() {
    const canvas = await this.crearImagen(
      document.querySelector('.draw-container')!
    );
    const file = await base64ToFile(canvas.toDataURL());
    window.open(URL.createObjectURL(file!));
  }

  /**
   * Muestra u oculta el frame que se extrajo del video en pantalla
   * @param visible true para mostrar
   */
  public async setVisibleFrame(visible: boolean) {
    const imageContainer: HTMLDivElement =
      document.querySelector('.image-container')!;
    const drawContainer: HTMLImageElement =
      document.querySelector('.draw-container')!;

    const containerDnone = imageContainer.classList.contains('d-none');
    const drawDnone = drawContainer.classList.contains('d-none');
    if (visible) {
      if (containerDnone) {
        imageContainer.classList.remove('d-none');
        imageContainer.classList.add('d-flex');
      }
      if (drawDnone) {
        drawContainer.classList.remove('d-none');
        drawContainer.classList.add('d-flex');
      }
    } else {
      await this.takeDrawedImage();
      if (!containerDnone) {
        imageContainer.classList.add('d-none');
        imageContainer.classList.remove('d-flex');
      }
      if (!drawDnone) {
        drawContainer.classList.add('d-none');
        drawContainer.classList.remove('d-flex');
      }
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  render() {
    this.video = this.videoRef.nativeElement;
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d')!;

    // Configuracion de linea dibujada
    this.context.lineWidth = 3; //grosor
    this.context.lineCap = 'round'; //bordes redondeados
    this.context.strokeStyle = 'blue'; //color
  }

  write(coord) {
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPosition = {
      x: coord.x - rect.left,
      y: coord.y - rect.top,
    };
    this.writeSingle(prevPosition);
  }

  private writeSingle(prevPos, emit: boolean = true) {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      const prevPosition = this.points[this.points.length - 1];
      const currentPosition = this.points[this.points.length - 2];

      this.drawOnCanvas(prevPosition, currentPosition);
      // if (emit) {
      // this.socketWebService.emitEvent({ prevPosition });
      // }
    }
  }

  private drawOnCanvas(prevPos: any, currentPosition: any) {
    if (!this.context) throw new Error('No existe el contexto');
    this.context.beginPath();

    if (prevPos) {
      this.context.moveTo(prevPos.x, prevPos.y);
      this.context.lineTo(currentPosition.x, currentPosition.y);
      this.context.stroke();
    }
  }

  isDragging(evt: any) {
    return evt.target.id == 'canvasId' && this.isMouseDown;
  }

  mouseDown() {
    this.isMouseDown = true;
  }

  mouseUp() {
    this.isMouseDown = false;
    this.points = []; //limpia los puntos para empezar un nuevo trazo
  }
}
