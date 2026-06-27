


import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (ZodSchema: z.ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Default to an empty object if req.body is undefined
      let validationData = req.body || {};

      // 2. If it's form-data and the text payload is inside the 'data' field, parse it
      if (req.body && typeof req.body.data === "string") {
        validationData = JSON.parse(req.body.data);
      }

      // 3. Validate the data
      const parseResult = await ZodSchema.safeParseAsync(validationData);

      if (!parseResult.success) {
        return next(parseResult.error);
      }

      // 4. Overwrite req.body with the clean data
      req.body = parseResult.data;
      
      next();
    } catch (error) {
      next(error);
    }
  };
};