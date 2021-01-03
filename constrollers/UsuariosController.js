const { meeting } = require('../models');
const { book } = require('../models');

module.exports = {
    index: async(req, res) => {
        // console.log(user)
        let meetings = await meeting.findAll();
        let books = await book.findAll();
        return res.json({ "meetings": meetings, "books": books });
    }
}