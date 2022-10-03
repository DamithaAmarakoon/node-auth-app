import Joi from 'joi';

export const signup = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(5)
    .pattern(/[a-zA-Z0-9]/)
    .required()
});

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
