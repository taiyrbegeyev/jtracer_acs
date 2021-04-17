import Joi from 'joi';

class AuthValidator {
  createModeratorSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    // The roles array must contain at least one string
    roles: Joi.array().items(Joi.string().required()).unique().required()
  });
}

export default new AuthValidator();
