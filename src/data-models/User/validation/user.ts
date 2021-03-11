import joi from 'joi';

export const user = joi.object({
  login: joi.string().required(),
  password: joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')).required(),
  age: joi.number().integer().min(4).max(130).required(),
  isDeleted: joi.boolean().required(),
});
