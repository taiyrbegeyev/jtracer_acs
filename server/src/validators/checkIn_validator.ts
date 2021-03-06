import Joi, { optional, required } from 'joi';

class CheckInValidator {
  checkInSchema = Joi.object({
    eventId: Joi.string().required(),
    endTime: Joi.date().iso().required(),
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

  contactTracingSchema = Joi.object({
    attendeeEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required()
  });
}

export default new CheckInValidator();
