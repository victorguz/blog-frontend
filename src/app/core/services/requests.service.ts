import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getToken } from './functions.service';
import { BasicResponse } from '../models/basic-response.model';
import { isEmpty, isNotEmptyObject, isObject, isURL } from 'class-validator';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ContentType, RequestMethod } from '../constants.config';
import { HttpBody } from '../../shared/interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  private isAllowedDomain(domain: string, headers: any = undefined) {
    const allowedDomain = environment.allowedDomains.find((dom) => {
      return domain.includes(dom) || dom.includes(domain);
    });
    headers = isObject(headers) && isNotEmptyObject(headers) ? headers : {};
    allowedDomain ? (headers['Authorization'] = 'Bearer ' + getToken()) : {};
    return headers;
  }

  private validateUrl(url: string) {
    if (isEmpty(url) || isURL(url)) {
      throw new Error('No se puede hacer el request a una url vacía');
    }
  }

  get(body: HttpBody): Observable<BasicResponse> {
    this.validateUrl(body.url);
    let paramsUrl = '';
    body.headers = this.isAllowedDomain(body.url, body.headers);
    body.headers = new HttpHeaders(body.headers);
    // Recorremos los parametros para convertirlos a parametros de url
    for (const key in body.params) {
      if (Object.prototype.hasOwnProperty.call(body.params, key)) {
        const value = body.params[key];
        paramsUrl += `${key}=${value}&`;
      }
    }
    return this.http.get<BasicResponse>(`${body.url}?${paramsUrl.toString()}`, {
      headers: body.headers,
    });
  }

  delete(body: HttpBody): Observable<BasicResponse> {
    this.validateUrl(body.url);
    body.headers = this.isAllowedDomain(body.url, body.headers);
    let paramsUrl = '';
    body.headers = new HttpHeaders(body.headers);
    // Recorremos los parametros para convertirlos a parametros de url
    for (const key in body.params) {
      if (Object.prototype.hasOwnProperty.call(body.params, key)) {
        const value = body.params[key];
        paramsUrl += `${key}=${value}&`;
      }
    }
    return this.http.delete<BasicResponse>(
      `${body.url}?${paramsUrl.toString()}`,
      {
        headers: body.headers,
      }
    );
  }

  post(body: HttpBody, contentType: ContentType = ContentType.JSON) {
    return this.postByMethod(body, contentType, RequestMethod.POST);
  }

  patch(body: HttpBody, contentType: ContentType = ContentType.JSON) {
    return this.postByMethod(body, contentType, RequestMethod.PATCH);
  }

  put(body: HttpBody, contentType: ContentType = ContentType.JSON) {
    return this.postByMethod(body, contentType, RequestMethod.PUT);
  }

  private postByMethod(
    body: HttpBody,
    contentType: ContentType,
    method: RequestMethod.POST | RequestMethod.PATCH | RequestMethod.PUT
  ): Observable<BasicResponse> {
    this.validateUrl(body.url);
    body.headers = this.isAllowedDomain(body.url, body.headers);
    body.headers['Content-Type'] = contentType;
    body.headers = new HttpHeaders(body.headers);
    if (contentType == ContentType.FORM) {
      const paramsUrlEncoded = new URLSearchParams();
      for (const key in body.params) {
        if (Object.prototype.hasOwnProperty.call(body.params, key)) {
          const element = body.params[key];
          paramsUrlEncoded.append(key, element);
        }
      }
      body.params = paramsUrlEncoded.toString();
    }
    switch (method) {
      case RequestMethod.POST:
        return this.http.post<BasicResponse>(body.url, body.params, {
          headers: body.headers,
        });

      case RequestMethod.PATCH:
        return this.http.patch<BasicResponse>(body.url, body.params, {
          headers: body.headers,
        });

      case RequestMethod.PUT:
        return this.http.put<BasicResponse>(body.url, body.params, {
          headers: body.headers,
        });
    }
  }
}


