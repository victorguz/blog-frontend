import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { HelpersService } from '../../../../../core/services/helpers.service';
import {
  CardInfo,
  WOMPY_PAYMENT_METHOD_LIST,
  WOMPY_PAYMENT_METHOD_TYPE,
} from '../../../../../interfaces/wompi.interfaces';
import { WompiService } from '../../../../../services/wompi.service.ts.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  token = '';

  clientForm = this.helpers.formBuilder.group({
    name: [''],
    lastname: [''],
    email: [''],
    phone: [''],
  });

  transactionForm = this.helpers.formBuilder.group({
    type: [WOMPY_PAYMENT_METHOD_TYPE.CARD],
    acceptance_token: [''],
  });

  cardForm = this.helpers.formBuilder.group({
    card_holder: ['', Validators.required],
    cvc: ['', Validators.required],
    exp_month: ['', Validators.required],
    exp_year: ['', Validators.required],
    number: ['', Validators.required],
  });

  paymentMethodList = WOMPY_PAYMENT_METHOD_LIST;
  permalink = '';

  isSubmited = false;

  constructor(
    private helpers: HelpersService,
    private wompiService: WompiService
  ) {}

  ngOnInit(): void {
    this.getAceptationToken();
  }

  get sessionId(): string | null {
    return sessionStorage.getItem(environment.wompy.session_id_local);
  }

  get selectedMethod() {
    return this.transactionForm.value.type;
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
          this.token = data.presigned_acceptance.acceptance_token;
          this.permalink = data.presigned_acceptance.permalink;
        }
      },
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
      acceptance_token: this.checkboxChecked ? '' : this.permalink,
    });
  }

  onSubmit() {
    this.isSubmited = true;
  }
  get showForm() {
    return this.permalink && this.token && this.paymentMethodList;
  }
  get checkboxChecked() {
    return this.transactionForm.value.acceptance_token ? true : false;
  }

  get isCard() {
    return this.selectedMethod == WOMPY_PAYMENT_METHOD_TYPE.CARD;
  }
}
