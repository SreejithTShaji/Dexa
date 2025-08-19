import { plainToInstance } from "class-transformer";
import { validate as classValidate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (dtoClass: any, source: "body" | "params" | "query" = "body") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req[source]);

    const errors = await classValidate(dtoObj, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.map(err => ({
          field: err.property,
          constraints: err.constraints,
        })),
      });
    }
    req[source] = dtoObj;
    next();
  };
};
