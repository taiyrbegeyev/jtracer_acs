import Joi from 'joi';

class AuthValidator {
  loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    password: Joi.string().required()
  });

  createModeratorSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    // The roles array must contain at least one string
    roles: Joi.array().items(Joi.string().required()).unique().required()
  });
}

export default new AuthValidator();
