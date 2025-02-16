export class SuccessResponseDto<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;

  constructor(data: T, message = 'Success') {
    this.success = true;
    this.statusCode = 200;
    this.message = message;
    this.data = data;
  }
}
