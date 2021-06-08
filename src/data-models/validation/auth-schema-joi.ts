import joi from 'joi';

export const authSchemaJoi = joi.object({
  login: joi.string().required(),
  password: joi.string().required(),
});
