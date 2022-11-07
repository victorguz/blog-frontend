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

  tokenCard(cardInfo: CardInfo, token: string) {
    return this.req.get<WompiTokenResponse>(
      `${this.API}/merchants/${environment.wompy.public_key}`,
      undefined,
      { Authorization: token }
    );
  }
}
