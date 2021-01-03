const Joi = require('joi');

const bookSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .max(30)
        .required(),

    summary: Joi.string()
        .min(5)
        .max(200)
        .required(),

    image: Joi.string().default("https://meutopsite.com/producao_unificado/media/images/sonho-de-colchoes/produto/559.jpg"),
    type: Joi.number()
        .integer()
        .min(0)
        .max(1)
        .required(),
    status: Joi.alternatives()
        .required()
        .conditional('type', [
            { is: 0, then: Joi.number().integer().min(0).max(1) },
            { is: 1, then: Joi.number().integer().min(2).max(3) },
        ])
})
module.exports = bookSchema;