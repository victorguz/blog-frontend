import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { HelpersService } from '../../../../../core/services/helpers.service';
import {
  CardInfo,
  WOMPY_PAYMENT_METHOD_LIST,
  WOMPY_PAYMENT_METHOD_TYPE,
} from '../../../../../interfaces/wompi.interfaces';
import { MercadoPagoService } from '../../../../../services/mercadopago.service';
import { WompiService } from '../../../../../services/wompi.service.ts.service';

@Component({
  selector: 'app-mercado-pago-form',
  templateUrl: './mercado-pago-form.component.html',
  styleUrls: ['./mercado-pago-form.component.scss'],
})
export class MercadoPagoFormComponent implements OnInit {
  clientForm = this.helpers.formBuilder.group({
    name: [''],
    lastname: [''],
    email: [''],
    phone: [''],
  });

  transactionForm = this.helpers.formBuilder.group({
    type: [WOMPY_PAYMENT_METHOD_TYPE.CARD, Validators.required],
    acceptance_token: ['', Validators.required],
    permalink: ['', Validators.required],
    checked_terms: [false],
  });

  cardForm = this.helpers.formBuilder.group({
    card_holder: ['Khalimat Bronsema', Validators.required],
    cvc: ['787', Validators.required],
    exp_month: ['09', Validators.required],
    exp_year: ['24', Validators.required],
    number: ['4259495989159514', Validators.required],
  });

  cardPaymentForm = this.helpers.formBuilder.group({});

  paymentMethodList = WOMPY_PAYMENT_METHOD_LIST;

  isSubmited = false;

  constructor(
    private helpers: HelpersService,
    private wompiService: WompiService,
    private mercadoPagoService: MercadoPagoService
  ) {
    console.log(this.mercadoPagoService.MercadoPago);
  }

  ngOnInit(): void {
    this.getAceptationToken();
  }

  isSelectedMethod(methodType: WOMPY_PAYMENT_METHOD_TYPE | any) {
    return this.transactionForm.value.type == methodType;
  }

  setSelectedMethod(methodType: WOMPY_PAYMENT_METHOD_TYPE | any) {
    this.transactionForm.patchValue({ type: methodType });
  }

  getAceptationToken() {
    this.wompiService.getAceptationToken().subscribe({
      next: (result) => {
        const data = result && result.data ? result.data : null;
        if (
          data &&
          data.presigned_acceptance &&
          data.accepted_payment_methods
        ) {
          this.setPaymentMethods(data.accepted_payment_methods);
          this.transactionForm.patchValue({
            acceptance_token: data.presigned_acceptance.acceptance_token,
            permalink: data.presigned_acceptance.permalink,
          });
        }
      },
      error: (error) => {
        this.helpers.notificaciones.notificarError(
          error && error.message ? error.message : ''
        );
      },
    });
  }

  tokenCard() {
    this.wompiService.tokenCard(this.cardFormBody, this.token!).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        this.helpers.notificaciones.notificarError(
          error && error.message ? error.message : ''
        );
      },
    });
  }

  cardPayment() {
    this.wompiService.cardPayment(this.cardFormBody, this.token!).subscribe({
      next: (result) => {},
      error: (error) => {
        this.helpers.notificaciones.notificarError(
          error && error.message ? error.message : ''
        );
      },
    });
  }

  setPaymentMethods(methods: WOMPY_PAYMENT_METHOD_TYPE[]) {
    if (methods)
      this.paymentMethodList = WOMPY_PAYMENT_METHOD_LIST.filter((item) =>
        methods.includes(item.value as any)
      );
  }

  toggleChecbox() {
    this.transactionForm.patchValue({
      checked_terms: !this.checkedTerms,
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.isCard) {
      if (this.cardForm.valid) {
        // Tokenizar tarjeta
        this.tokenCard();
      } else {
        this.helpers.notificaciones.notificarError(
          'Debe digitar todos los datos del medio de pago.'
        );
      }
    }
  }
  get showForm() {
    return this.transactionForm.valid && this.paymentMethodList;
  }
  get checkedTerms() {
    return this.transactionForm.value.checked_terms;
  }
  get sessionId(): string | null {
    return sessionStorage.getItem(environment.wompy.session_id_local);
  }

  get selectedMethod() {
    return this.transactionForm.value.type;
  }
  get isCard() {
    return this.selectedMethod == WOMPY_PAYMENT_METHOD_TYPE.CARD;
  }
  get token() {
    return this.transactionForm.value.acceptance_token;
  }
  get permalink() {
    return this.transactionForm.value.permalink;
  }

  get cardFormBody(): CardInfo {
    const value = this.cardForm.value;
    return {
      card_holder: value.card_holder!,
      cvc: value.cvc!,
      exp_month: value.exp_month!,
      exp_year: value.exp_year!,
      number: value.number!,
    };
  }
}
