import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message: string | object;
    let status: HttpStatus;

    status = HttpStatus.INTERNAL_SERVER_ERROR;
    message = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }
    if (exception.code === 500) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    if (exception.code === 27) {
      status = HttpStatus.BAD_REQUEST;
    }
    if (exception.code === 59) {
      status = HttpStatus.BAD_REQUEST;
    }
    if (exception.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
    }
    if (exception.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
    }
    if (exception.code === 251) {
      status = HttpStatus.CONFLICT;
    }
    if (exception.code === 18) {
      status = HttpStatus.UNAUTHORIZED;
    }
    if (exception.code === 112) {
      status = HttpStatus.CONFLICT;
    }
    if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
    }
    if (exception.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
    }
    if (exception.name === 'DocumentNotFoundError') {
      status = HttpStatus.NOT_FOUND;
    }
    if (exception.name === 'MongoNetworkError') {
      status = HttpStatus.SERVICE_UNAVAILABLE;
    }
    if (exception.name === 'MongoServerSelectionError') {
      status = HttpStatus.SERVICE_UNAVAILABLE;
    }
    if (exception.name === 'MongoTimeoutError') {
      status = HttpStatus.GATEWAY_TIMEOUT;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message,
    });
  }
}
