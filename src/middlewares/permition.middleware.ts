import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PermitionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const permition = req.headers['permition'];
    if (!permition) {
      throw new BadRequestException('Permission header is required');
    }
    switch (permition) {
      case 'read':
        next();
        break;

      case 'create':
        next();
        break;

      case 'delete':
        next();
        break;

      case 'update':
        next();
        break;

      default:
        console.log('permition denied');
        throw new BadRequestException('permition denied');
    }
  }
}
