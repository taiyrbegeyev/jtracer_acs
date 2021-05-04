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
    // https://stackoverflow.com/a/19605207/13278127
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        )
      )
      .required()
  });
}

export default new AuthValidator();
