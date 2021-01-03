const Joi = require('joi');
const schemaValidate = (schema, property) => {
    return (req, res, next) => {
        const { value, error } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            req.body = value;
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message, details);
            res.status(422).json({ error: message })
        }
    }
}
module.exports = schemaValidate;