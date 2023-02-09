import Joi from "joi";
import { HttpCode, MainAppError } from "../../utlis/MainAppError";
import { NextFunction } from "express";

// Central validation function

const validator = async (
  schemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction,
): Promise<void> => {
  const value = await schemaName.validate(body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  try {
    value.error
      ? next(
          new MainAppError({
            httpCode: HttpCode.BAD_REQUEST,
            message: value.error.details[0].message,
          }),
        )
      : next();
  } catch (error) {
    console.log(error);
  }
};

export default validator;
