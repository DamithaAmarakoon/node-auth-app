import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateBody = function (schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error)
      return res.status(400).json({
        status: false,
        msg: result.error.details.map((err) => ({
          error: err.message,
          path: err.path[0]
        }))
      });
    next();
  };
};
