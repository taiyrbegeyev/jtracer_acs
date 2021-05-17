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
    emailToken: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    password: Joi.string()
      // https://stackoverflow.com/a/19605207/13278127
      .pattern(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        )
      )
      .required()
  });

  verifyEmailTokenSchema = Joi.object({
    emailToken: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
  });
}

export default new AuthValidator();
