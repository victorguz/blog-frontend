import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestsService } from '../core/services/requests.service';
import { CardInfo, WompiTokenResponse } from '../interfaces/wompi.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WompiService {
  private API = environment.production
    ? environment.wompy.link_production
    : environment.wompy.link_sandbox;
  constructor(private req: RequestsService) {}

  getAceptationToken() {
    return this.req.get<WompiTokenResponse>(
      `${this.API}/merchants/${environment.wompy.public_key}`
    );
  }
  /**
   * Authorization header requires 'Credential' parameter.
   * Authorization header requires 'Signature' parameter.
   * Authorization header requires 'SignedHeaders' parameter.
   * Authorization header requires existence of either a 'X-Amz-Date' or a 'Date' header.
   * Authorization=pub_test_Tw5G1yMq0kA70eJoOU77Am5x0EURHiOV
   * @param cardInfo
   * @param token
   * @returns
   */
  tokenCard(cardInfo: CardInfo, token: string) {
    return this.req.get<WompiTokenResponse>(
      `${this.API}/tokens/cards`,
      undefined,
      {
        Authorization: environment.wompy.public_key,
        Credential: '',
        Signature: '',
        SignedHeaders: '',
        Date: new Date().toString(),
      }
    );
  }

  cardPayment(paymentInfo: any, token: string) {
    return this.req.get<WompiTokenResponse>(
      `${this.API}/merchants/${environment.wompy.public_key}`,
      undefined,
      { Authorization: token }
    );
  }
}
