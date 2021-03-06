const { sequelize, Meeting, User_has_meeting } = require('../../models');
const { Sequelize, Op, where } = require('sequelize')
const transporter = require("../../config/transport")
const moment = require('moment');
const MeetingController = {
    inscription: async(req, res) => {
        let limit = req.pagination.limit;
        let page = req.pagination.page;
        try {
            const inscriptions = await Meeting.findAll({
                include: [{
                    model: User_has_meeting,
                    where: {
                        user_id: req.user.id
                    },
                    attributes: []
                }],
                where: req.query,
                offset: 0 + (req.pagination.page - 1) * req.pagination.limit,
                limit: req.pagination.limit,
            })

            res.status(200).json({
                "items": inscriptions,
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

    uninscription: async(req, res) => {
        try {
            const book = await User_has_meeting.destroy({
                include: [{
                    model: Meeting,
                    where: {
                        datetime_start: {
                            [Op.gt]: moment().toDate()
                        },
                    }
                }],
                where: {
                    user_id: req.user.id,
                    id: req.params.id,
                }
            })

            if (!book) {
                return res.status(404).json({
                    "title": "Você não esta inscrito no evento!",
                    "errors": ["Você não esta inscrito no evento!"]
                });
            }

            res.status(200).json({
                "title": "Você se desinscreveu desse evento!",
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
                    "title": "Encontro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Encontro!"]
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

                let date_now = moment();
                date_now.date(date_now.date() - 1);
                if (req.body.location && meeting.datetime_start < date_now.toDate()) {
                    return res.status(400).json({
                        "title": "Atualização falhou:(",
                        "errors": ["Só é possivel adicionar a url do encontro no dia anterior ao encontro!"]
                    });
                }

                const updated_meeting = await meeting.update(req.body)

                if (req.body.location && updated_meeting.location) {
                    let emails = [];
                    const inscriptions = await updated_meeting.getUser_has_meetings()
                    for (const inscription of inscriptions) {
                        let user = await inscription.getUser()
                        emails.push(user.email)
                    }

                    const mailOptions = {
                        from: 'olamundo132@gmail.com',
                        to: emails,
                        subject: 'Link para participação de encontro disponibilizado!',
                        html: '<h1>Link disponivel!</h1>' +
                            '<p>O criador do evendo acabou de disponibilizar o link para o encontro, acesse na hora do evento!</p>' +
                            '<a href=' + updated_meeting.location + '>Entrar no encontro</a>'
                    };
                    transporter.sendMail(mailOptions);
                };
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