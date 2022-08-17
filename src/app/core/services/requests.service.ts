import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getBasicError, getErrorMessage, getToken } from './functions.service';
import { BasicResponse } from '../models/basic-response.model';
import { isIn, isNotEmptyObject, isObject } from 'class-validator';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private _http: HttpClient) {}

  private isAllowedDomain(domain: string, headers: any = undefined) {
    const allowedDomain = environment.allowedDomains.find((dom) => {
      return domain.includes(dom) || dom.includes(domain);
    });
    headers = isObject(headers) && isNotEmptyObject(headers) ? headers : {};
    allowedDomain ? (headers['Authorization'] = 'Bearer ' + getToken()) : {};
    return headers;
  }

  async get(
    url: string,
    params: any = {},
    headers: any = undefined
  ): Promise<BasicResponse> {
    try {
      if (url) {
        let paramsUrl = '';
        headers = this.isAllowedDomain(url, headers);
        headers = new HttpHeaders(headers);
        // Recorremos los parametros para convertirlos a parametros de url
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            paramsUrl += `${key}=${value}&`;
          }
        }
        const result = await this._http
          .get(`${url}?${paramsUrl.toString()}`, {
            headers: headers,
          })
          .toPromise();
        return new BasicResponse(true, 'Request success', result);
      } else {
        return new BasicResponse(
          false,
          'No se puede hacer el request a una url vacía'
        );
      }
    } catch (error) {
      return new BasicResponse(
        false,
        getErrorMessage(error),
        undefined,
        getBasicError(error)
      );
    }
  }

  async delete(
    url: string,
    params: any = {},
    headers: any = undefined
  ): Promise<BasicResponse> {
    try {
      if (url) {
        headers = this.isAllowedDomain(url, headers);
        let paramsUrl = '';
        headers = new HttpHeaders(headers);
        // Recorremos los parametros para convertirlos a parametros de url
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            paramsUrl += `${key}=${value}&`;
          }
        }
        const result = await this._http
          .delete(`${url}?${paramsUrl.toString()}`, {
            headers: headers,
          })
          .toPromise();
        return new BasicResponse(true, 'Request success', result);
      } else {
        return new BasicResponse(
          false,
          'No se puede hacer el request a una url vacía'
        );
      }
    } catch (error) {
      return new BasicResponse(
        false,
        getErrorMessage(error),
        undefined,
        getBasicError(error)
      );
    }
  }

  async postLikeFormUrlEncoded(
    url: string,
    params: any,
    headers: any = undefined,
    method:
      | RequestMethod.POST
      | RequestMethod.PATCH
      | RequestMethod.PUT = RequestMethod.POST
  ): Promise<BasicResponse> {
    try {
      if (url) {
        headers = this.isAllowedDomain(url, headers);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const paramsUrlEncoded = new URLSearchParams();
        headers = new HttpHeaders(headers);
        for (const key in params) {
          if (Object.prototype.hasOwnProperty.call(params, key)) {
            const element = params[key];
            paramsUrlEncoded.append(key, element);
          }
        }
        let result: any;
        switch (method) {
          case RequestMethod.POST:
            result = await this._http
              .post(url, paramsUrlEncoded.toString(), { headers: headers })
              .toPromise();
            break;
          case RequestMethod.PATCH:
            result = await this._http
              .patch(url, paramsUrlEncoded.toString(), { headers: headers })
              .toPromise();
            break;
          case RequestMethod.PUT:
            result = await this._http
              .put(url, paramsUrlEncoded.toString(), { headers: headers })
              .toPromise();
            break;
        }
        return new BasicResponse(true, 'Request success', result);
      } else {
        return new BasicResponse(
          false,
          'No se puede hacer el request a una url vacía'
        );
      }
    } catch (error) {
      return new BasicResponse(
        false,
        getErrorMessage(error),
        undefined,
        getBasicError(error)
      );
    }
  }

  async postLikeJSON(
    url: string,
    params: any,
    headers: any = undefined,
    method:
      | RequestMethod.POST
      | RequestMethod.PATCH
      | RequestMethod.PUT = RequestMethod.POST
  ): Promise<BasicResponse> {
    try {
      if (url) {
        headers = this.isAllowedDomain(url, headers);
        headers['Content-Type'] = 'application/json';
        headers = new HttpHeaders(headers);
        let result: any;
        switch (method) {
          case RequestMethod.POST:
            result = await this._http
              .post(url, params, { headers: headers })
              .toPromise();
            break;
          case RequestMethod.PATCH:
            result = await this._http
              .patch(url, params, { headers: headers })
              .toPromise();
            break;
          case RequestMethod.PUT:
            result = await this._http
              .put(url, params, { headers: headers })
              .toPromise();
            break;
        }
        return new BasicResponse(true, 'Request success', result);
      } else {
        return new BasicResponse(
          false,
          'No se puede hacer el request a una url vacía'
        );
      }
    } catch (error) {
      return new BasicResponse(
        false,
        getErrorMessage(error),
        undefined,
        getBasicError(error)
      );
    }
  }
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
