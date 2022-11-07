export interface WompiNewTransaction {
  acceptance_token: string;
  amount_in_cents: number;
  currency: WOMPY_ACCEPTED_CURRENCIES;
  customer_email: string;
  payment_method?: {
    type: WOMPY_PAYMENT_METHOD_TYPE;
    token: string;
    installments: number;
  };
  payment_source_id?: number;
  redirect_url?: string;
  reference: string;
  customer_data?: {
    phone_number?: string;
    full_name: string;
    legal_id?: string;
    legal_id_type?: WOMPY_ACCEPTED_NATIONAL_ID;
  };
  shipping_address?: {
    address_line_1: string;
    address_line_2?: string;
    country: string;
    region: string;
    city: string;
    name?: string;
    phone_number: string;
    postal_code?: string;
  };
}

export interface WompiTokenResponse {
  data: {
    id: number;
    name: string;
    email: string;
    contact_name: string;
    phone_number: string;
    active: true;
    logo_url: any;
    legal_name: string;
    legal_id_type: WOMPY_ACCEPTED_NATIONAL_ID;
    legal_id: string;
    public_key: string;
    accepted_currencies: WOMPY_ACCEPTED_CURRENCIES[];
    fraud_javascript_key: any;
    fraud_groups: any[];
    accepted_payment_methods: WOMPY_PAYMENT_METHOD_TYPE[];
    payment_methods: any[];
    presigned_acceptance: {
      acceptance_token: string;
      permalink: string;
      type: string;
    };
  };
  meta: any;
}

export enum WOMPY_ACCEPTED_CURRENCIES {
  COP = 'COP',
  USD = 'USD',
}
export enum WOMPY_ACCEPTED_NATIONAL_ID {
  CC = 'CC',
  NIT = 'NIT',
}

export enum WOMPY_PAYMENT_METHOD_TYPE {
  CARD = 'CARD',
  BANCOLOMBIA_TRANSFER = 'BANCOLOMBIA_TRANSFER',
  NEQUI = 'NEQUI',
  PSE = 'PSE',
  BANCOLOMBIA_COLLECT = 'BANCOLOMBIA_COLLECT',
}

export const WOMPY_PAYMENT_METHOD_LIST = [
  {
    value: WOMPY_PAYMENT_METHOD_TYPE.CARD,
    description: 'Tarjeta de crédito/débito',
  },
  { value: WOMPY_PAYMENT_METHOD_TYPE.PSE, description: 'PSE' },
  {
    value: WOMPY_PAYMENT_METHOD_TYPE.BANCOLOMBIA_TRANSFER,
    description: 'Transferencia Bancolombia',
  },
  { value: WOMPY_PAYMENT_METHOD_TYPE.NEQUI, description: 'Nequi' },
  {
    value: WOMPY_PAYMENT_METHOD_TYPE.BANCOLOMBIA_COLLECT,
    description: 'Corresponsal Bancolombia',
  },
];

export interface CardInfo {
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
  card_holder: string;
}
