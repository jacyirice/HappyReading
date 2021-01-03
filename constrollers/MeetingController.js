const { Meeting, Address_meeting } = require('../models');
const { User_has_meeting } = require('../models');
const MeetingController = {
    index: async(req, res) => {
        const meetings = await Meeting.findAll({
            include: ['user', {
                model: address_meeting,
                // where: { uf: req.user.address.uf, city: req.user.address.city }
            }],
            where: {
                datetime_start: {
                    [Op.gt]: moment().toDate()
                },
            },
            limit: 8,
        });
        return res.json({ "meetings": meetings });
    },

    detail: async(req, res) => {
        const meeting = await Meeting.findOne({
            include: ['user', 'book', 'address_meeting'],
            where: {
                id: req.params.id
            }
        })
        return res.json(meeting);
    },

    my_index: async(req, res) => {
        const meetings = await Meeting.findAll({
            include: [{
                model: Address_meeting,
            }],
            where: {
                user_id: req.user.id
            },
            limit: 8,
        });
        return res.json({ "meetings": meetings });
    },

    my_detail: async(req, res) => {
        const meeting = await Meeting.findOne({
            include: ['book', 'address_meeting'],
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })
        return res.json({ "meeting": meeting });
    },

    my_inscription: async(req, res) => {
        const meetings = await Meeting.findAll({
            include: [{
                model: User_has_meeting,
                where: {
                    user_id: req.user.id
                }
                // attributes: ['user_id'],
                // through: {
                //     attributes: [],
                // },
            }],
            where: {
                user_id: req.user.id
            },
            limit: 8,
        });
        return res.json(meetings)
    },

    store: async(req, res) => {
        req.body["user_id"] = req.user.id
        let meeting = await Meeting.create(req.body);
        res.status(201).json(meeting);
    },

    destroy: async(req, res) => {
        await Meeting.destroy({
            where: {
                user_id: req.user.id,
                id: req.params.id,
                datetime_start: {
                    [Op.gt]: moment().toDate()
                },
            }
        });
        res.json({ "msg": "Ok" });
    },

    markPresence: async(req, res) => {
        let user_has_meeting, created = await User_has_meeting.findOrCreate({
            where: {
                meeting_id: req.params.id,
                user_id: req.user.id,
            }
        });
        console.log(created);
        return res.json(created);
    }
}
module.exports = MeetingController;