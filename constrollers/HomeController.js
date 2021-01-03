const { Meeting } = require('../models');
const { Book } = require('../models');
const { Address_meeting } = require('../models');
const { Swap } = require('../models');
const { Op, where } = require('sequelize')
const Sequelize = require('sequelize');
var moment = require('moment');
const { User_has_meeting } = require('../models');
module.exports = {
    index: async(req, res) => {
        let meetings = await Meeting.findAll({
            include: ['user', {
                model: Address_meeting,
                // as: 'address',
                // where: { uf: "TO", city: "Palmas" }
            }],
            where: {
                datetime_start: {
                    [Op.lt]: moment().toDate()
                },
            },
            limit: 8,
        });
        let books = await Book.findAll({
            where: {
                type: 1,
            },
            limit: 8,
        });
        let swaps = await Swap.findAll({
            include: ['book'],
            where: {
                status: 0,
            },
            limit: 8,
        });
        // return res.json({})
        return res.json({ "moment": moment, "meetings": meetings, "books": books, "swaps": swaps });
        // return res.render('livros', { "moment": moment, "meetings": meetings, "books": books, "swaps": swaps });
    }
}