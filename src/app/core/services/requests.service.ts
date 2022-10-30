import { ContentType, RequestMethod } from '../constants.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take, timeout } from 'rxjs';
import { isEmpty, isNotEmptyObject, isObject, isURL } from 'class-validator';

import { BasicResponse } from '../interfaces/basic-response.interface';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  private createHeaders(headers: any = undefined) {
    headers =
      isObject(headers) && isNotEmptyObject(headers) ? headers : undefined;
    return headers ? new HttpHeaders(headers) : headers;
  }

  private validateUrl(url: string) {
    if (isEmpty(url) || !isURL(url)) {
      throw new Error('Esta url no tiene el formato requerido o está vacía.');
    }
  }

  get<T>(url: string, params?: any, headers?: any | undefined): Observable<T> {
    this.validateUrl(url);
    let paramsUrl = '';
    headers = this.createHeaders(headers);
    // Recorremos los parametros para convertirlos a parametros de url
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        paramsUrl += `${key}=${value}&`;
      }
    }
    return this.http
      .get<T>(
        `${url}?${paramsUrl.toString()}`,
        headers
          ? {
              headers,
            }
          : undefined
      )
      .pipe(take(1));
  }

  delete<T>(url: string, params?: any, headers?: any): Observable<T> {
    let paramsUrl = '';
    this.validateUrl(url);
    headers = this.createHeaders(headers);
    // Recorremos los parametros para convertirlos a parametros de url
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const value = params[key];
        paramsUrl += `${key}=${value}&`;
      }
    }
    return this.http
      .delete<T>(`${url}?${paramsUrl.toString()}`, {
        headers: headers,
      })
      .pipe(take(1));
  }

  post<T>(
    url: string,
    params?: any,
    headers?: any,
    contentType: ContentType = ContentType.JSON
  ) {
    return this.postByMethod<T>(
      url,
      params,
      headers,
      contentType,
      RequestMethod.POST
    ).pipe(take(1));
  }

  patch<T>(
    url: string,
    params?: any,
    headers?: any,
    contentType: ContentType = ContentType.JSON
  ) {
    return this.postByMethod<T>(
      url,
      params,
      headers,
      contentType,
      RequestMethod.PATCH
    ).pipe(take(1));
  }

  put<T>(
    url: string,
    params?: any,
    headers?: any,
    contentType: ContentType = ContentType.JSON
  ) {
    return this.postByMethod<T>(
      url,
      params,
      headers,
      contentType,
      RequestMethod.PUT
    ).pipe(take(1));
  }

  private postByMethod<T>(
    url: string,
    params?: any,
    headers?: any,
    contentType: ContentType = ContentType.JSON,
    method:
      | RequestMethod.POST
      | RequestMethod.PATCH
      | RequestMethod.PUT = RequestMethod.POST
  ): Observable<T> {
    this.validateUrl(url);
    headers = this.createHeaders({ ...headers, 'Content-Type': contentType });
    if (contentType == ContentType.FORM) {
      const paramsUrlEncoded = new URLSearchParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const element = params[key];
          paramsUrlEncoded.append(key, element);
        }
      }
      params = paramsUrlEncoded.toString();
    }
    switch (method) {
      case RequestMethod.POST:
        return this.http.post<T>(url, params, {
          headers: headers,
        });

      case RequestMethod.PATCH:
        return this.http.patch<T>(url, params, {
          headers: headers,
        });

      case RequestMethod.PUT:
        return this.http.put<T>(url, params, {
          headers: headers,
        });
    }
  }
}
