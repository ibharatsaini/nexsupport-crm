import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
       res.status(409).json({
        message: 'A record with this value already exists',
      });
    }
    return
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation error',
      errors: error.errors,
    });
    return
  }

  res.status(500).json({
    message: 'Internal server error',
  });
  return
};