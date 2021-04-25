import Joi from 'joi';

class CheckInValidator {
  checkInSchema = Joi.object({
    eventID: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    isGuest: Joi.boolean().required(),
    phoneNumber: Joi.string()
      .phoneNumber({ format: 'international' })
      .required(),
    zipCode: Joi.string().required()
  });
}

export default new CheckInValidator();
