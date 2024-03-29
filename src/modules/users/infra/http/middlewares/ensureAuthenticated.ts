import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayLoad{
  iar: number;
  exp: number;
  sub: string;
}

export default function ensureAutheticated(request: Request, response: Response, next: NextFunction): void {
  //validação token JWT

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Jwt token is missing", 401);
  }

  // barer ajsnsjdkl

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret); 

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    }

    return next();
  } catch (err) {
    throw new AppError("Inavlid JWT token", 401);    
  }
}