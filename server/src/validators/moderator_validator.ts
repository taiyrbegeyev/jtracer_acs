import Joi from 'joi';

class ModeratorValidator {
  moderatorSchema = Joi.object({
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

export default new ModeratorValidator();
