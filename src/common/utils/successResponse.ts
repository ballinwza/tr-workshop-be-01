export class SuccessResponseDto<T, messsage> {
  success: boolean;
  message: messsage;
  statusCode: number;
  data: T;

  constructor(data: T, message: messsage) {
    this.success = true;
    this.statusCode = 200;
    this.message = message;
    this.data = data;
  }
}
