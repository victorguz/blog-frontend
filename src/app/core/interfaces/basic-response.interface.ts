import { CodigosRespuesa } from '../constants.config';

export class BasicResponse<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
  error?: any;

  constructor(
    success: boolean = false,
    message: string = '',
    status: number,
    data: any = undefined,
    error: any = undefined
  ) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
