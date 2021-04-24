import Joi from 'joi';

class EventValidator {
  eventSchema = Joi.object({
    eventName: Joi.string().trim().required(),
    // The organizers array must contain at least one string
    organizers: Joi.array().items(Joi.string().required()).unique().required()
  });
}

export default new EventValidator();
