const { Meeting } = require('../../models');
const { User } = require('../../models');
const { Book } = require('../../models');
const { Op, where } = require('sequelize')
const moment = require('moment');
module.exports = {
    index: async(req, res) => {
        let meetings = await Meeting.findAll({
            attributes: ['id', 'objective', 'datetime_start'],
            include: [{ model: User, attributes: ['first_name', 'last_name', 'email'] }],
            where: {
                datetime_start: {
                    [Op.gt]: moment().toDate()
                },
            },
            limit: 8,
        });
        let books = await Book.findAll({
            attributes: ['id', 'title', 'image'],
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 8,
        });
        res.json({ "moment": moment, "meetings": meetings, "books": books });
    }
}