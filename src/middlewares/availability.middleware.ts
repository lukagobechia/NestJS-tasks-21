import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AvailabilityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: true,
    });
    const startTime = new Date(`2024-01-01T10:00:00`).toLocaleTimeString(
      'en-US',
      { hour12: true },
    );
    const endTime = new Date(`2024-01-01T20:00:00`).toLocaleTimeString(
      'en-US',
      { hour12: true },
    );

    if (currentTime >= startTime && currentTime <= endTime) {
      return next();
    }
    console.log('unavailable at this time');
    throw new UnauthorizedException('unavailable at this time');
  }
}
