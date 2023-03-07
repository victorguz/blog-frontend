export class BasicResponse<T> {
  success: boolean = false;
  message: string;
  status: number;
  data?: T;
  error?: { error: any; message: string };
  constructor(
    success: boolean,
    message: string,
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
