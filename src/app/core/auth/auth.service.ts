import {
  AuthenticationInterface,
  LoginResponse,
  PermisoInterface,
  TokenPayload,
  UsuarioAuth,
} from './auth.interfaces';
import {
  CodigosRespuesa,
  LOGIN_ROUTE,
  ROUTE_ON_LOGIN,
} from '../constants.config';
import { FUNCIONALIDADES_SISTEMA } from '../role.config';
import { Observable, Subject } from 'rxjs';
import {
  arrayNotEmpty,
  isArray,
  isEmpty,
  isNotEmpty,
  isNotEmptyObject,
  isObject,
} from 'class-validator';
import { getFromLocal, setOnLocal } from '../services/functions.service';

import { BasicResponse } from '../interfaces/basic-response.interface';
import { FORBIDDEN_ROUTE } from './../constants.config';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificacionesService } from './../services/notificaciones.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private req: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private notificaciones: NotificacionesService
  ) {}

  /**
   * @description permite realizar el inicio de sesión del usuario en la aplicacion
   */
  iniciarSesion(body: AuthenticationInterface): Observable<number> {
    let subject = new Subject<number>();

    this.req
      .post<BasicResponse<any>>(`${environment.API}/${environment.LOGIN}`, body)
      .subscribe({
        next: (resultLogin) => {
          if (resultLogin && resultLogin.status == CodigosRespuesa.Ok) {
            const loginResponse: LoginResponse = resultLogin.data;
            if (this.isValidLoginResponse(loginResponse)) {
              this.token = loginResponse.token;
              this.usuario = loginResponse;
              this.permisos = loginResponse.permisos;
              this.router.navigate([ROUTE_ON_LOGIN]);
              subject.next(CodigosRespuesa.Ok);
            } else {
              subject.next(CodigosRespuesa.BadRequest);
            }
          }
        },
        error: (error) => {
          subject.error(error.status ? error.status : 500);
        },
      });

    return subject.asObservable();
  }

  isValidLoginResponse(response: LoginResponse) {
    let result: boolean = true;
    for (const key in response) {
      if (Object.prototype.hasOwnProperty.call(response, key)) {
        const element: any = response[key];
        if (
          (!isObject(element) && isEmpty(element)) ||
          (isObject(element) && !isNotEmptyObject(element)) ||
          (isArray(element) && !arrayNotEmpty(element))
        ) {
          result = false;
          return;
        }
      }
    }
    return result;
  }
  /**
   * @description permite realizar el inicio de sesión del usuario en la aplicacion
   */
  cerrarSesion() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([LOGIN_ROUTE]);
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  /**
   * @description permite determinar si el usuario esta autenticado
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  /**
   * @description obtener datos del usuario
   */
  get usuario(): UsuarioAuth {
    const result = getFromLocal(environment.CONST.USER_INFO);
    if (isEmpty(result)) {
      throw new Error(
        'Esta función requiere que se haya iniciado sesión.'
        // 'Error de autenticacion'
      );
    }
    return result;
  }

  /**
   * @description configurar datos del usuario
   */
  private set usuario(usuario: LoginResponse | UsuarioAuth) {
    const result = getFromLocal(environment.CONST.USER_INFO);
    if (isNotEmpty(result)) {
      throw new Error(
        'No se puede iniciar sesión con otro usuario sin cerrar la anterior'
        // 'Error de autenticacion'
      );
    }
    setOnLocal(environment.CONST.USER_INFO, {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      contrasenaActualizada: usuario.contrasenaActualizada,
      rol: usuario.rol,
      id: usuario.id,
    } as UsuarioAuth);
  }

  /**
   * @description obtener token
   */
  get token() {
    return getFromLocal(environment.CONST.JWT_TOKEN);
  }

  /**
   * @description configurar token
   */
  private set token(token: string) {
    setOnLocal(environment.CONST.JWT_TOKEN, token);
  }

  /**
   * @description obtener datos del token
   */
  private get tokenPayload(): TokenPayload {
    return this.jwtHelper.decodeToken(this.token);
  }

  /**
   * @description obtener permisos
   */
  get permisos(): PermisoInterface[] {
    return getFromLocal(environment.CONST.PERMISOS) || [];
  }

  /**
   * @description configurar permisos
   */
  set permisos(values: PermisoInterface[]) {
    setOnLocal(environment.CONST.PERMISOS, values);
  }

  getPermiso(codigoFuncionalidad: FUNCIONALIDADES_SISTEMA) {
    const permisos = this.permisos ? this.permisos : [];

    return permisos.find((funcion) => {
      const isEqual = funcion.funcionalidadCodigo === codigoFuncionalidad;
      const hasActions =
        funcion.accionConsultar ||
        funcion.accionCrear ||
        funcion.accionModificar ||
        funcion.accionEliminar;
      return hasActions && isEqual;
    });
  }

  validarPermiso(
    codigoFuncionalidad: FUNCIONALIDADES_SISTEMA,
    accion:
      | 'accionConsultar'
      | 'accionCrear'
      | 'accionModificar'
      | 'accionEliminar'
  ) {
    const permiso = this.getPermiso(codigoFuncionalidad);
    // 'Acceso ilícito: No tiene permiso para ejecutar esta funcionalidad'
    if (!permiso || !permiso[accion]) this.router.navigate([FORBIDDEN_ROUTE]);
  }

  modalCambiarContrasena() {
    // this.notificaciones.modalComponent({
    //   component: DialogCambiarContrasenaComponent,
    //   width: '600px',
    //   options: this.usuario,
    // });
  }
}
