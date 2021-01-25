const { Meeting, User, User_has_meeting } = require('../../models');
const { Sequelize, Op, where } = require('sequelize')
const moment = require('moment');
const { object } = require('joi');

const MeetingController = {

    index: async(req, res) => {
        let limit = req.pagination.limit;
        let page = req.pagination.page;
        try {
            const meetings = await Meeting.findAll({
                attributes: ['id', 'objective', 'datetime_start'],
                where: {
                    datetime_start: {
                        [Op.gt]: moment().toDate()
                    },
                },
                offset: 0 + (page - 1) * limit,
                limit: limit,
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
                    { model: User, attributes: ['first_name', 'last_name', 'email'] },
                    { model: User_has_meeting, attributes: [] },
                ],
                where: {
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

    markPresence: async(req, res) => {
        try {
            const meeting = await Meeting.findOne({
                attributes: ['id'],
                where: {
                    id: req.params.id,
                    datetime_start: {
                        [Op.gt]: moment().toDate()
                    },
                },
            })
            if (!meeting) {
                return res.status(404).json({
                    "title": "Encontro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Encontro!"]
                })
            }
            const inscription = await User_has_meeting.findOrCreate({
                where: {
                    meeting_id: req.params.id,
                    user_id: req.user.id,
                }
            })
            if (inscription[1]) {
                return res.status(201).json({
                    "title": "Presença marcada com sucesso!",
                    "object": null
                });
            } else {
                return res.status(400).json({
                    "title": "Opa! Calma lá",
                    "errors": ["Vc já está inscrito nesse encontro!"],
                })
            }
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Criação falhou:(",
                    "errors": errors,
                });
            } else {
                console.log(errors)
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };

    }
}
module.exports = MeetingController;