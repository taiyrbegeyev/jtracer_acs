import Joi from 'joi';
import { Status } from 'models/requests';

class RequestValidator {
  createRequestSchema = Joi.object({
    moderatorId: Joi.string().required(),
    // either an email address or a phone number
    attendeeInfo: Joi.alternatives()
      .try(
        Joi.string()
          .email({ tlds: { allow: false } })
          .trim(),
        Joi.string()
      )
      .required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required()
  });

  approveDeclineRequestSchema = Joi.object({
    requestId: Joi.string().required(),
    action: Joi.string().valid(Object.keys(Status)).required()
  });
}

export default new RequestValidator();
