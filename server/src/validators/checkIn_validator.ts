import config from 'config';
import Joi, { optional, required } from 'joi';

class CheckInValidator {
  checkInSchema = Joi.object({
    eventId: Joi.string().required(),
    eventDuration: Joi.number()
      .integer()
      .positive()
      .max(config.event.maxDuration)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    isGuest: Joi.boolean().required(),
    phoneNumber: Joi.string().when('isGuest', {
      is: true,
      then: required(),
      otherwise: optional()
    }),
    zipCode: Joi.string().when('isGuest', {
      is: true,
      then: required(),
      otherwise: optional()
    })
  });
}

export default new CheckInValidator();
