const { Book, Chapter } = require('../models');
const BookController = {
    index: async(req, res) => {
        const books = await Book.findAll({
            where: {
                type: 1,
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 8,
        });
        return res.json({ "books": books });
    },
    my_index: async(req, res) => {
        type = req.query.type || 0
        user = req.user.id
        const books = await Book.findAll({
            where: {
                type: type,
                user_id: user
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 8,
        });
        return res.json({ "books": books });
    },
    detail: async(req, res) => {
        const bookID = await Book.findOne({
            where: {
                id: req.params.id
            }
        })
        return res.json({ "Book": bookID });
    },
    my_detail: async(req, res) => {
        const bookID = await Book.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })
        return res.json({ "Book": bookID });
    },
    store: async(req, res) => {
        req.body["user_id"] = req.user.id
        let book = await Book.create(req.body);
        return res.status(201).json({ "object": book });
    },
    update: async(req, res) => {
        const bookUpdated = await Book.update(
            req.body, {
                where: { id: req.params.bookId, user_id: req.user.id }
            });
        return res.json({ "status": "ok" });
    },
    destroy: async(req, res) => {
        await Book.destroy({
            where: {
                user_id: 1, //req.user.id,
                id: req.params.id,
            }
        });
        return res.json({ "status": "ok" });
    },

}

module.exports = BookController;