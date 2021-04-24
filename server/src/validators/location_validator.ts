import Joi from 'joi';

class LocationValidator {
  locationSchema = Joi.object({
    locationName: Joi.string().trim().required(),
    capacity: Joi.number().integer().positive().max(500).required()
  });
}

export default new LocationValidator();
