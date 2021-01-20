const { sequelize, Meeting, User_has_meeting } = require('../../models');
const { Sequelize, Op, where } = require('sequelize')
const transporter = require("../../config/transport")
const moment = require('moment');
const MeetingController = {
    index: async(req, res) => {
        let limit = req.pagination.limit;
        let page = req.pagination.page;
        try {
            const meetings = await Meeting.findAll({
                where: {
                    user_id: req.user.id
                },
                offset: 0 + (req.pagination.page - 1) * req.pagination.limit,
                limit: req.pagination.limit,
            })

            res.status(200).json({
                "items": meetings,
                "page": page,
                "limit": limit
            });
        } catch (errors) {
            console.log(errors)
            res.status(500).json({
                "title": "Algo aconteceu:(",
                "errors": ['Algo inexperado aconteceu!'],
            });
        };
    },

    detail: async(req, res) => {
        try {
            const meeting = await Meeting.findOne({
                attributes: ['id', 'objective', 'summary', 'datetime_start', 'datetime_finish', [Sequelize.fn("COUNT", Sequelize.col("user_has_meetings.id")), "inscriptions"]],
                include: [
                    { model: User_has_meeting, attributes: [] },
                ],
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            })

            if (!meeting) {
                res.status(404).json({
                    "title": "Livro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu livro!"]
                });
            };

            res.status(200).json(meeting);
        } catch (errors) {
            console.log(errors)
            res.status(500).json({
                "title": "Algo aconteceu:(",
                "errors": ['Algo inexperado aconteceu!'],
            });
        };
    },

    store: async(req, res) => {
        req.body.user_id = req.user.id;
        try {
            let errors = []
            if (req.body.datetime_start <= moment().toDate())
                errors.push("meeting.datetime_start cannot be less than the current date");
            if (req.body.datetime_start >= req.body.datetime_finish)
                errors.push("meeting.datetime_finish cannot be less than the start date");
            if (req.body.location)
                errors.push("meeting.location must be made available only one day before the event starts and in an update");
            console.log(errors)
            if (errors.length)
                return res.status(400).json({
                    "title": "Criação falhou:(",
                    "errors": errors
                });

            const meeting = await Meeting.create(req.body)

            res.status(201).json({
                "title": "Encontro criado com sucesso!",
                "object": meeting
            });
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Criação falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },

    update: async(req, res) => {
        delete req.body.user_id
        try {
            const result = await sequelize.transaction(async(t) => {
                const meeting = await Meeting.findOne({
                    where: {
                        id: req.params.id,
                        user_id: req.user.id,
                        datetime_finish: {
                            [Op.gt]: moment().toDate()
                        },
                    }
                })

                if (!meeting) {
                    return res.status(404).json({
                        "title": "Encontro não encontrado!",
                        "errors": ["Não foi possivel encontrar seu Encontro!"]
                    });
                }

                const updated_meeting = await meeting.update(req.body)

                res.status(201).json({
                    "title": "Meeting atualizado com sucesso!",
                    "object": meeting
                });
            })
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Atualização falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                console.log(errors)
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },

    destroy: async(req, res) => {
        try {
            const meeting = await Meeting.destroy({
                where: {
                    user_id: req.user.id,
                    id: req.params.id,
                    datetime_start: {
                        [Op.gt]: moment().toDate()
                    },
                }
            })


            if (!meeting) {
                res.status(404).json({
                    "title": "Encontro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Encontro!"]
                });
            }

            res.status(200).json({
                "title": "Encontro deletado com sucesso!",
                "object": null
            });

        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Deleção falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },
}
module.exports = MeetingController;