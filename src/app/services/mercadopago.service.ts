import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestsService } from '../core/services/requests.service';
import { CardInfo, WompiTokenResponse } from '../interfaces/wompi.interfaces';
import { MercadoPago } from 'src/assets/js/mercadopago-v2';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private API = environment.production
    ? environment.mercadopago.link_production
    : environment.mercadopago.link_sandbox;
  constructor(private req: RequestsService) {}

  get MercadoPago() {
    return new MercadoPago(environment.mercadopago.public_key);
  }
}
