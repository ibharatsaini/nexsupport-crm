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
  console.log(error)
  res.status(500).json({
    error: error.stack,
    message: 'Internal server error',
  });
  return
};