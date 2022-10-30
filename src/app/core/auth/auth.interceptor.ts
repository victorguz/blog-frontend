import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { LOGIN_ROUTE, MENSAJES } from '../constants.config';
import {
  Observable,
  catchError,
  finalize,
  map,
  throwError,
  timeout,
} from 'rxjs';
import {
  hideLoadingSpinner,
  showLoadingSpinner,
} from '../services/functions.service';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { NotificacionesService } from '../services/notificaciones.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificaciones: NotificacionesService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;
    authReq = this.addTokenHeader(request, this.authService.token || '');
    showLoadingSpinner();
    return next.handle(authReq).pipe(
      timeout(this.getRequestTimeout(request)),
      catchError((error: HttpErrorResponse) => {
        // if (
        //   error instanceof HttpErrorResponse &&
        //   error.status === 401 &&
        //   this.needsValidation(request)
        // ) {
        //   this.handleUnauthorized();
        // }
        return this.handleError(error);
      }),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        return evt;
      }),
      finalize(() => {
        hideLoadingSpinner();
      })
    );
  }

  needsValidation(req: HttpRequest<any>) {
    return (
      req.url.includes(environment.API) && !req.url.includes(environment.LOGIN)
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: any) {
    if (this.needsValidation(req)) {
      const newreq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return newreq;
    }
    return req;
  }

  handleUnauthorized() {
    this.authService.cerrarSesion();
    this.notificaciones.modalInformacion({
      message:
        'Detectamos que pasaste mucho tiempo inactivo y por seguridad hemos cerrado tu sesión. Vuelve a iniciar para continuar.',
      title: 'La sesión expiró',
    });
    this.router.navigate([LOGIN_ROUTE]);
  }

  getRequestTimeout(req: HttpRequest<any>) {
    return req.url.includes(environment.API) ? environment.REQUEST_TIMEOUT : 0;
  }

  /**
   * @description manejo de excepciones http
   * @param error error
   * @returns throwError de la petición
   */
  handleError(error: any) {
    let err = {};
    if (error.error) {
      // client-side error
      err['message'] = error.error.message || MENSAJES.ERROR_GENERAL.message;
      err['status'] = 0;
    } else {
      // server-side error
      err['message'] = error.message || MENSAJES.ERROR_GENERAL.message;
      err['status'] = error.status || 0;
    }

    return throwError(() => {
      return err;
    });
  }
}
