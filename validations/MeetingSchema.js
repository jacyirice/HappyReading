const Joi = require('joi');

const meetingSchema = Joi.object({
    type: Joi.number()
        .integer()
        .min(0)
        .max(1)
        .required(),

    location: Joi.string(),

    datetime_start: Joi.date()
        .required(),

    datetime_finish: Joi.date()
        .required(),

    objective: Joi.string()
        .required(),

    summary: Joi.string()
        .required(),

})
module.exports = meetingSchema;