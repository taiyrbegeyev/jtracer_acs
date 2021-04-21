import Joi from 'joi';

class AuthValidator {
  loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    password: Joi.string().required()
  });

  registerSchema = Joi.object({
    emailToken: Joi.string().token().required(),
    // https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/
    password: Joi.string()
      .pattern(
        new RegExp(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'
        )
      )
      .required()
  });

  createModeratorSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    // The roles array must contain at least one string
    roles: Joi.array().items(Joi.string().required()).unique().required(),
    inviteeId: Joi.string().required()
  });
}

export default new AuthValidator();
