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
    message = exception;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }
    if (exception.code === 27) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Index not found error';
    }
    if (exception.code === 59) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Command not found error';
    }
    if (exception.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }
    if (exception.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }
    if (exception.code === 251) {
      status = HttpStatus.CONFLICT;
      message = 'Transaction aborted error';
    }
    if (exception.code === 18) {
      status = HttpStatus.UNAUTHORIZED;
      message = 'Unauthorized error';
    }
    if (exception.code === 112) {
      status = HttpStatus.CONFLICT;
      message = 'Write conflict error';
    }
    if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate key error';
    }
    if (exception.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = `Invalid value for field: ${exception.path}`;
    }
    if (exception.name === 'DocumentNotFoundError') {
      status = HttpStatus.NOT_FOUND;
      message = 'Document not found error';
    }
    if (exception.name === 'MongoNetworkError') {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Database connection error';
    }
    if (exception.name === 'MongoServerSelectionError') {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Mongo server selection error';
    }
    if (exception.name === 'MongoTimeoutError') {
      status = HttpStatus.GATEWAY_TIMEOUT;
      message = 'Mongo timeout error';
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message,
    });
  }
}
