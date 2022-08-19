// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { catchError, finalize, map, Observable, retry, throwError } from 'rxjs';
// import { hideLoadingSpinner, showLoadingSpinner } from '../core/services/functions.service';

// @Injectable()
// export class RequestsInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     showLoadingSpinner();
//     return next
//       .handle(request)
//       .pipe(retry(1), catchError(this.handleError))
//       .pipe(
//         map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
//           return evt;
//         }),
//         finalize(() => {
//           hideLoadingSpinner();
//         })
//       );
//   }

//   /**
//    * @description manejo de excepciones http
//    * @param error error
//    * @returns throwError de la petición
//    */
//   handleError(error: any) {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       // client-side error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }

//     return throwError(() => {
//       return errorMessage;
//     });
//   }
// }
