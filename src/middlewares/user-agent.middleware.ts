import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const device = req.headers['user-agent'];
    
    if (device && /(Windows NT|Macintosh|X11|Linux|PostmanRuntime)/i.test(device)) {
      console.log('It is a desktop device - ', device);
      next();
    } else {
      console.log('It is not desktop - ', device);
      res.status(403).send('Access is permited for desktop devices');
    }
  }
}
