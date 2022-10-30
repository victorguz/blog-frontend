import { Parametro } from './../../../../core/interfaces/shared.interfaces';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ESTADOS_ASIGNACIONES } from '../../../../core/constants.config';
import {
  getClassEstadoAsignacion,
  toPhraseCase,
} from '../../../../core/services/functions.service';

@Component({
  selector: 'app-circulo-estado-asignacion',
  templateUrl: './circulo-estado-asignacion.component.html',
  styleUrls: ['./circulo-estado-asignacion.component.scss'],
})
export class CirculoEstadoAsignacionComponent implements OnInit, OnChanges {
  @Input() estadoId: number = 0;
  @Input() size: string = '15px';
  @Input() vencido: boolean = false;
  @Input() estadosAsignaciones: Parametro[] = [];
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}

  getNombreEstado(estadoId: number) {
    if (this.vencido) {
      return toPhraseCase(ESTADOS_ASIGNACIONES.VENCIDO);
    }
    const estado = this.estadosAsignaciones.find(
      (value) => value.id == estadoId
    );
    return toPhraseCase(
      estado ? estado.nombre : ESTADOS_ASIGNACIONES.SIN_INICIAR
    );
  }

  getClassEstado(estadoId: number) {
    if (this.vencido) {
      return getClassEstadoAsignacion(ESTADOS_ASIGNACIONES.VENCIDO);
    }
    const estado = this.estadosAsignaciones.find(
      (value) => value.id == estadoId
    );
    if (estado) {
      estado.nombre = estado.nombre.toUpperCase();
      return getClassEstadoAsignacion(estado.nombre as any);
    }
    return 'border';
  }
}
